// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyD31Yn-V4cQRL-h1BYK6NK9juzU6rEdPBU",
    authDomain: "techleadher-2e14b.firebaseapp.com",
    databaseURL: "https://techleadher-2e14b.firebaseio.com",
    projectId: "techleadher-2e14b",
    storageBucket: "techleadher-2e14b.appspot.com",
    messagingSenderId: "562300134740",
    appId: "1:562300134740:web:7596de3985a5e1489214c1"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  console.log(1)
  
  //Refernce contactInfo collections
  let contactInfo = firebase.database().ref("infos");
  
  // $(document).ready(function () {
  //     $('.submit').click(function (event) {
  //         event.preventDefault()
  //         console.log('Clicked button')
  
  //         var name=$('#name').val()
  //         var email =$('#email').val()
  //         var message =$('#message').val()
  //         var statusElm=$('.stutus')
  //         statusElm.empty()
  
  //         if(email.length > 5 && email.includes('@') && email.includes('.')) {
  //            statusElm.append('<div>Email is valid</div>')
  //         } else {
  //             statusElm.append('<div>Enter a valid email address</div>')
  //         }
  
  //         if(name.length > 2){
  //             statusElm.append('<div>Name is valid</div>')
  //         }else {
  //             statusElm.append('<div>Enter your name</div>')
  //         }
  
  
  //         if(message.length <300 ){
  //             statusElm.append('<div>Message is valid</div>')
  //         }else {
  //         statusElm.append('<div>Message is too long</div>')
  //       }
  
  //     })
  // });
  
  
  //listen for submit
  document.querySelector(".contact-form").addEventListener("submit", submitForm);
  
  function submitForm(e) {
    e.preventDefault();
  
     //Get input values
     
      let name = document.querySelector(".name").value;
      let email =document.querySelector('.email').value;
      let message =document.querySelector('.message').value;
      // let statusElm= document.querySelector('.stutus')
      //   statusElm.empty();
  
    saveContactInfo(name, email, message);
  
     document.querySelector(".contact-form").reset();
  
     sendEmail(name, email, message);
   }
   // Save infos to Firebase
   function saveContactInfo(name, email, message){
     let newContactInfo = contactInfo.push();
  
     newContactInfo.set({
       name: name,
       email: email,
       message: message
     });
     retriveInfos();
   }
   // Retrive Infos
   function retriveInfos() {
     let ref = firebase.database().ref("infos");
     ref.on("value", gotData);
   }
   function gotData(data) {
     let info = data.val();
     let keys = Object.keys(info);
  
     for (let i=0; i < keys.length; i++) {
       let infoData = keys[i];
       let name = info[infoData].name;
       let email = info[infoData].email;
       let message = info[infoData].message;
       console.log(name, email, message);
  
       // let infosResults = document.querySelector(".infosResults");
  
      // infosResults.innerHTML += `<div>
      //  <p><strong>Name: <strong/>${name} <br/>
      //  <a><strong>Email: <strong/>${email}</a> <br/>
      //  <a><strong>Message: <strong/>${message} </a> 
      //  </P>
  
  
      //  </div>`;
  
     }
   }
   
   retriveInfos();
   //  Send Email Info
   function sendEmail(name, email, message){
     Email.send({
       Host:"smtp.gmail.com",
       Username:'mimichabereket@gmail.com',
       Password:"dhwlmcefvdzygczw",
       To:"mimichabereket@gmail.com",
       From:"mimichabereket@gmail.com",
       Subject: `${name} sent you a message`,
       Body: `Name: ${name} <br/> Email:${email} <br/> Message: ${message}`,
     }).then((message) => alert("Your massage has been sent. We will get back to you as soon as possible"))
   }
   