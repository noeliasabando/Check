function saveUser(){
    console.log("saveUser");
    let newUser = getForm();
    console.log(newUser);
    if(validateform(newUser) === true){
      
      localStorage.setItem('register',JSON.stringify(newUser));
     
/*

        let newRegistroKey = firebase.database().ref().child('registros').push().key;
        console.log(newRegistroKey);
        firebase.database().ref(`registros/${newRegistroKey}`).set({
            userName : newUser.userName,
            rutUser : newUser.rutUser,
            eMail : newUser.eMail,
            enterpriseFrom : newUser.enterpriseFrom,
            patenteUser : newUser.patenteUser,
            collaboratorName : newUser.collaboratorName,
            reasonVisit : newUser.reasonVisit
        }, function(error){
            //console.log('Listo!!!!');
           window.location = 'picture.html';
       });  
       */
      window.location = 'picture.html';
    }else{
        console.log('Faltan campos importantes!!!');
    }
}
function getForm(){
  let reasonVisit;
  if(document.getElementById("meetingCheck").checked === true) {
    reasonVisit = 'meeting';
  }
  if(document.getElementById("interviewCheck").checked === true) {
    reasonVisit = 'interview';
  }
  if(document.getElementById("personalCheck").checked === true) {
    reasonVisit = 'personal';
  }
  if(document.getElementById("otherCheck").checked === true) {
    reasonVisit = 'other';
  }
  let dateTime = new Date();
  let nowDateTime = dateTime.getDate() + '/' + (dateTime.getMonth() +1) + '/' + dateTime.getFullYear() +
                    ' ' + dateTime.getHours() + ':' + dateTime.getMinutes();
  let collaboratorDrop =  document.getElementById("collaboratorName");
  let collaboratorValues = collaboratorDrop.options[collaboratorDrop.selectedIndex];

  let newUser = {
     userName : document.getElementById("userName").value,
     rutUser : document.getElementById("rutUser").value,
     eMail : document.getElementById("eMail").value,
     enterpriseFrom : document.getElementById("enterpriseFrom").value,
     patenteUser : document.getElementById("patenteUser").value,
     collaboratorName : collaboratorValues.text,
     collaboratorEmail : collaboratorValues.value,
     createTime: nowDateTime,
     reasonVisit : reasonVisit
  } 
  return newUser;
}
function validateform(user){ //Valida que los campos obligatorios estén completados.
  let sValid = true;
  if(user.userName === ''){
    sValid = false;
  }
  if(user.rutUser === ''){
    sValid = false;
  }
  if(user.eMail === '' ){
    sValid = false;
  }
  if(!validarEmail(user.eMail)){
    sValid = false;
  }
  if(user.enterpriseFrom === ''){
    sValid = false;
  }
  if(user.collaboratorName === ''){
    sValid = false;
  }
  if(user.reasonVisit === ''){
    sValid = false;
  }
  let opciones = document.getElementsByName("reasonVisit");//Valida que al menos un check este seleccionado.
  let seleccionado = false;
  for(let i=0; i<opciones.length; i++) {    
    if(opciones[i].checked) {
      seleccionado = true;
      break;
    }
  }
  if(!seleccionado) {
    sValid = false;
  }
  return sValid;
}
function validarEmail(valor) {// Valida que mail cumpla con formato
    if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(valor)){
        return true;
    } else {
        return false;
    }
} 

function main(){
  //document.getElementById('usersDataList').innerHTML = '';// Limpia Data list
  document.getElementById('collaboratorName').innerHTML = '';
  firebase.database().ref('residentes').limitToLast(1000)
  .on('child_added', (resident)=>{
    console.log(resident.val().name);
    var drop = document.getElementById("collaboratorName");
    var option = document.createElement("option");
    option.text = resident.val().name;
    option.value = resident.val().mail;
    drop.add(option);
  });
}
//se comenta hasta que se confirme el formato en firebase
main();