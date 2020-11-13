const stripe = Stripe(
  "pk_test_51GxExbKOFmCt70mTZZDa7tS4mOMxhW0MXvHsKqZ2EQJdW3wmytP8eSBy4Z7lgBvIeNjtpHBRXUsKqy4mSOJsWqqV00sOEyMi4L"
);

const redirectToCheckout = (response) => {
  if(response.error) {
      console.log(response.error)
  } else {
      stripe.redirectToCheckout({sessionId: response.session_id})
  }
};

const payForMembership = (lineItems) => {
  var response = fetch(`/stripe/checkout/`,{
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify({
              lineItems: lineItems
          })
      }).then(function(response) {
          
      if (response.status != 200) {
          return {error: response.statusText}
      } else {
          return response.json();
      }
      
  }).then(redirectToCheckout);

}
// firebase configuration

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
function getFormInput(id){
  return document.getElementById(id).value;
};


function postToFirebase (obj){
  var ref = firebase.database().ref('membership').push();
  console.log("i am trying to check where is the error");

  if(isIndustry){
    ref.set({
      name: obj.name,
      email: obj.email,
      phone: obj.phone,
      contact: obj.contact,
      company: obj.company,
      industry: obj.industry,
      indInterest:obj.indInterest,
      education: obj.education,
      indLinkedin: obj.indLinkedin,
      indSeeking: obj.indSeeking,
    })
  } else if(isUniversity){
    ref.set({
      name: obj.name,
      email: obj.email,
      phone: obj.phone,
      contact: obj.contact,
      university: obj.university,
     yearProgram: obj.yearProgram,
      uniAreaInterest:obj.uniAreaInterest,
     uniSeeking:obj.uniSeeking,
    })
  }else if(isHighSchool){
    ref.set({
      name: obj.name,
      email: obj.email,
      phone: obj.phone,
      contact: obj.contact,
      highschool: obj.highschool,
      grade: obj.grade,
      careerInterest:obj.careerInterest,
      highUnivInterest: obj.highUnivInterest,
      highProgram: obj.highProgram,
    highSeeking: obj.highSeeking,
    })
  }
}

function getFormInput(id){
  return document.getElementById(id).value;
};
let isHighSchool=false;
let isIndustry = false;
let isUniversity = false;
$( document ).ready(function() {
    console.log( "ready!" );
    
    $('#buttonInd').on('click', () => {
        console.log( "i am first" );
         $("#industry").show();
        $("#staticFields").show();
        $("#university").hide();
        $("#highschool").hide();
        $("#membershipFee").show();
        isIndustry=true;
        console.log("industry is true")
               
    });
     

      $('#buttonUni').on('click', () => {
        console.log( "i am second" );
        $("#university").show();
        $("#staticFields").show();
         $("#industry").hide();
        $("#highschool").hide();
        $("#membershipFee").show();
        isUniversity= true;
        console.log("university is true");
      

        }),
    $('#buttonHigh').on('click', () => {
      isHighSchool=true;
      console.log("high school is true");
        
        $("#highschool").show();
        $("#staticFields").show();
         $("#industry").hide();
        $("#university").hide();
        $("#membershipFee").hide();


    })
    $('.close').on('click', () => {
      console.log("all false")
        $("#form").trigger('reset')
      isIndustry = false;
      console.log(isIndustry)
      isUniversity = false;
      isHighSchool = false;
      console.log(isUniversity)
      console.log(isHighSchool)
    });

});
// common fields 
const form = document.getElementById("form");
const fname = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const contact = document.getElementById("contact");
const selectedContact = contact.value;

// industry fields
const companyName = document.getElementById("companyName");
const typeindustry = document.getElementById("typeindustry");
const indInterest = document.getElementById("indInterest");
const education = document.getElementById("education");
const indSeeking = document.getElementById("indSeeking");
const indLinkedin = document.getElementById("indLinkedin");

// getting dropdown value of industry fields
const selectedInterest = indInterest.value;
const selectedEducation = education.value;
const selectedSeeking = indSeeking.value;

// university fields
const university = document.getElementById("universityName");
const yearProgram = document.getElementById("yearProgram");
const uniAreaInterest = document.getElementById("uniAreaInterest");
const uniSeeking = document.getElementById("uniSeeking");

// getting dropdown value of university fields
const selectedUniAreaInterest = uniAreaInterest.value;
// const selectedUniversity = university.value;
const selectedUniSeeking = uniSeeking.value;

// high school fields
const highSchool = document.getElementById("highschoolName");
const grade = document.getElementById("grade");
const careerInterest = document.getElementById("careerInterest");
const highUnivInterest = document.getElementById("highUnivInterest");
const highProgram =  document.getElementById("highProgram");
const highSeeking = document.getElementById("highSeeking");
// getting dropdown value of high school fields
const selectedcareerInterest = careerInterest.value;
const selectedHighUnivInterest = highUnivInterest.value;
const selectedHighSeeking = highSeeking.value;



function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = "members-form-control error";
    const small = formControl.querySelector("small");
    small.innerText = message;
  }
  
  // Show success outline
  function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = "members-form-control success";
  }
  
  // Check email is valid
  function isValidEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
      showSuccess(input);
    } else {
      showError(input, "Email is not valid");
    }
  }
  // // Check name is valid letters only
  function isNameValid(name) {
    var letters = /^[A-Za-z]+$/;
    if (name.value.match(letters)) {
      showSuccess(name);
      return true;
    } else {
      showError(name, "Name can use only letters");
      return false;
    }
  }
  
  // Check required fields
  function checkRequired(inputArr) {
    inputArr.forEach(function (input) {
        console.log(inputArr);
      if (input.value.trim() === "") {
        showError(input, `${getFieldName(input)} is required!`);
      } else {
        showSuccess(input);
      }
    });
  }
  
  // Check length
  function checkLength(input, min, max) {
    if (input.value.length < min) {
      showError(
        input,
        `${getFieldName(input)} must be al least ${min} characters.`
      );
    } else if (input.value.length > max) {
      showError(
        input,
        `${getFieldName(input)} must be less than ${max} characters.`
      );
    } else {
      showSuccess();
    }
  }

  function checkPhone(input){
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if(input.value.match(phoneno))
       {
       return true;      
     }
     else
       {
       showError(input, "Phone number is not valid")
       return false;
       
  }

}
function checkDropdown(input){
  var x = input.value;
  console.log(x)
  if(x!=="Please select"){
    console.log("i am not equal please select")
    showSuccess(input);
    return true;
    
  }
  else{
    console.log("i am equeal to please select")
    showError(input, "Please select from provided options")
    return false;

  }
 
};





  
  // Get field name
  function getFieldName(input) {
    return input.name.charAt(0).toUpperCase() + input.name.slice(1);
  }

  // function validateStaticFields(){
  //   console.log("i am trying to validate statics")
  //   checkRequired([
  //     name,
  //     contact,
  //     email
  //   ])
  //   if(contact.value=="Phone"){
  //     console.log("phone is selected")
  //     console.log(contact.value)
  //     checkRequired([phone]);
  //     checkPhone(phone);
  //   }else{
  //     isValidEmail(email)
  //   }
        
  //   console.log(contact.value)
  //   isNameValid(name);
  //   checkLength(name, 3, 30);
  //   isValidEmail(email);
  // }

// function valIndForm(){
//   checkDropdown(indInterest);
//     checkDropdown(indSeeking);
//     // checkRequired([
//     //     indInterest,
//     //     indSeeking,
//     //         ]);
//             console.log(indInterest, indSeeking)

// }
// function valUnivForm(){
//   checkDropdown(uniAreaInterest);
//   checkDropdown(uniSeeking);
    // checkRequired([
    //     uniAreaInterest,
    //     uniSeeking,
    //   ]);
          
//       };

// function valHighForm(){
//   checkDropdown(careerInterest);
//   checkDropdown(highSeeking);
//         // checkRequired([
//         //     indInterest,
//         //     indSeeking,
//         //   ]);

// }

// let priceSelected;
// let listlineItems = [];
// class classSelected {
//                 constructor(price) {
//                   this.price = price;
//                   this.quantity = 1;
//                   console.log("i am in class")
//                 }
//               }

var valueInt;
// let lineItem ;
// let lineItems=[];
 $(document).ready(function () {
                var range = $(".input-range"),
                  value = $(".range-value");
              
                value.html(range.attr("value"));
              
                range.on("input", function () {
                  // const valueInt = parseInt(this.value);
                  valueInt=parseInt(this.value);
                  value.html(valueInt);
                  console.log(valueInt);
                  
                //   if(valueInt===0){
                //     console.log("cant be a zero")
                //   } else {
                //     priceSelected = stripePrices[valueInt];
                //     console.log(priceSelected);
                //     lineItem = new classSelected(priceSelected);
                //     listlineItems.push(lineItem);
                                             
                // }
                // lineItems = listlineItems.pop();
                // return lineItems;
                // lineItems = listlineItems.pop();
                // console.log(lineItems);

                });
            });
// console.log(lineItems);

// const fname=name.value;
// const femail=email.value;
function redirectHigh(){
  console.log("i went to submit")
  window.location.href="resources.html";
}       
          
          
form.addEventListener("submit",function(e){
            
            console.log("i am here")
              e.preventDefault();
              // validateStaticFields();
              let priceSelected;
              let listlineItems = [];
              class classSelected {
                              constructor(price) {
                                this.price = price;
                                this.quantity = 1;
                                console.log("i am in class")
                              }
                            }
                let lineItem ;
              let lineItems=[];
              if(valueInt===0){
                console.log("cant be a zero")
              } else {
                priceSelected = stripePrices[valueInt];
                console.log(priceSelected);
                lineItem = new classSelected(priceSelected);
                lineItems.push(lineItem);
                // lineItems = listlineItems.pop();
                console.log(lineItems);
                console.log("i went to else statement")
                // payForMembership(lineItems);                       
            }







              if(isIndustry){
                console.log("i am inside else if industry")
                // valIndForm();
                let objInd = {
                  name:fname.value,
                  email:email.value,
                  contact:contact.value,
                  phone:phone.value,
                  company:companyName.value,
                  industry: typeindustry.value,
                  indInterest:indInterest.value,
                  education: education.value,
                  indLinkedin: indLinkedin.value,
                  indSeeking: indSeeking.value,
                }
                console.log(objInd)
                postToFirebase(objInd);
                payForMembership(lineItems);
                console.log("i am validating Industry")
              }else if(isUniversity){
                console.log("i am in side else if university")
                // valUnivForm();
                let objUniv = {
                  name:fname.value,
                  email:email.value,
                  contact:contact.value,
                  phone:phone.value,
                  university: university.value,
                  yearProgram: yearProgram.value,
                  uniAreaInterest:uniAreaInterest.value,
                  uniSeeking:uniSeeking.value,
                  }
                  console.log(objUniv)
                postToFirebase(objUniv);
                // console.log(lineItems)
                payForMembership(lineItems);
                console.log("i am validating university")
              }else if(isHighSchool){
                console.log("i am in side else if highschool")
                // valHighForm();
                let objHigh = {
                  name:fname.value,
                  email:email.value,
                  contact:contact.value,
                  phone:phone.value,
                  highschool: highSchool.value,
                  grade: grade.value,
                  careerInterest:careerInterest.value,
                  highUnivInterest:highUnivInterest.value,
                  highProgram:highProgram.value,
                  highSeeking:highSeeking.value,
                  }
                  console.log(objHigh)
                  postToFirebase(objHigh);
                  redirectHigh();
                    
                console.log("i am validating highschool form");
              }
            //   let priceSelected;
            //   let listlineItems = [];
            //   class classSelected {
            //                   constructor(price) {
            //                     this.price = price;
            //                     this.quantity = 1;
            //                     console.log("i am in class")
            //                   }
            //                 }
            //     let lineItem ;
            //   let lineItems=[];
            //   if(valueInt===0){
            //     console.log("cant be a zero")
            //   } else {
            //     priceSelected = stripePrices[valueInt];
            //     console.log(priceSelected);
            //     lineItem = new classSelected(priceSelected);
            //     lineItems.push(lineItem);
            //     // lineItems = listlineItems.pop();
            //     console.log(lineItems);
            //     console.log("i went to else statement")
            //     payForMembership(lineItems);                       
            // }
              // payForMembership(lineItems);
            
            });

// const stripePrices={
//     10:"ten",
//     20:"twenty"
// }

// let priceSelected;
// const lineItems = [];
// class classSelected {
//                 constructor(price) {
//                   this.price = price;
//                   this.quantity = 1;
//                   console.log("i am in class")
//                 }
//               }


// let lineItem ;
// let lastLineItems;
//  $(document).ready(function () {
//                 var range = $(".input-range"),
//                   value = $(".range-value");
              
//                 value.html(range.attr("value"));
              
//                 range.on("input", function () {
//                   const valueInt = parseInt(this.value);
//                   value.html(valueInt);
//                   console.log(valueInt);
                  
//                   if(valueInt===0){
//                     console.log("cant be a zero")
//                   } else {
//                     priceSelected = stripePrices[valueInt];
//                     console.log(priceSelected);
//                     lineItem = new classSelected(priceSelected);
//                     lineItems.push(lineItem);
//                     console.log(lineItem);
//                     console.log("hello class")
//                     console.log("i went here");
//                     console.log(lineItems);
//                     lastLineItems=lineItems.pop();
//                     console.log(lastLineItems);
                              
//                 }
//                 });
//             });
// console.log(lineItems);

  
// Event Listeners
// console.log(uniForm);
// uniForm.addEventListener("submit",function(e){
//   // function validateIndustryForm(e){
// console.log("i am here")
//   e.preventDefault();
//   valUnivForm(); });
    

const stripePrices = {
  "0": "nothing",
  1:"price_1HUbVOKOFmCt70mT5cMMvUIW",
  2:"price_1HUbVPKOFmCt70mTMHPaSlDV ",
  3:"price_1HUbVPKOFmCt70mT5PLG42Xb",
  4:"price_1HUbVPKOFmCt70mTj66FedVF",
  5:"price_1HUbVPKOFmCt70mTHnG6wAWU",
  6:"price_1HUbVPKOFmCt70mTFiLZzkKO",
  7:"price_1HUbVPKOFmCt70mT6NwOc1LC ",
  8:"price_1HUbVPKOFmCt70mThkv8WTaQ",
  9:"price_1HUbVPKOFmCt70mTKf83hImc",
  // prices 10-19$
  10:"price_1HUGknKOFmCt70mTJrr1Mv12",
  11:"price_1HUbVQKOFmCt70mTddZTPlLr",
  12:"price_1HUbVQKOFmCt70mTJMQjZCFi",
  13:"price_1HUbVQKOFmCt70mTUALt3kTA",
  14:"price_1HUbVQKOFmCt70mT8ZHPWd0m ",
  15:"price_1HUbVQKOFmCt70mTpOlkQ1Jf",
  16:"price_1HUbVQKOFmCt70mT3RrxeVHU",
  17:"price_1HUbVQKOFmCt70mT4fLqLoDy",
  18:"price_1HUbVQKOFmCt70mTttpL1wnK",
  19:"price_1HUbVQKOFmCt70mTmoMJeBa3",
  // prices 20-29$
  20:"price_1HUIk2KOFmCt70mTvl5YRNKk",
  21:"price_1HUbVRKOFmCt70mT8Xw2Pv63",
  22:"price_1HUbVRKOFmCt70mTksG0R3l6",
  23:"price_1HUbVRKOFmCt70mTStKyiMjG",
  24:"price_1HUbVSKOFmCt70mTe6qL9KFZ",
  25:"price_1HUbVRKOFmCt70mTiCI4uusM",
  26:"price_1HUbVRKOFmCt70mTNng6p82M",
  27:"price_1HUbVRKOFmCt70mTiFd7k5hV",
  28:"price_1HUbVSKOFmCt70mTWdooU2E9 ",
  29:"price_1HUbVSKOFmCt70mTqwbuFIz1 ",
  // prices 30-39$
  30:"price_1HUbVSKOFmCt70mTjQjproSF ",
  31:"price_1HUc4IKOFmCt70mTJ3e9nv01",
  32:"price_1HUc5MKOFmCt70mTOUSOOfNS",
  33:"price_1HUc5xKOFmCt70mTNPHxFM1x",
  34:"price_1HUc68KOFmCt70mTkYac3NC2",
  35:"price_1HUc6KKOFmCt70mTvRzstu0l",
  36:"price_1HUc6UKOFmCt70mTx1u9VopW",
  37:"price_1HUc6fKOFmCt70mTZ4EwBpca",
  38:"price_1HUc6qKOFmCt70mTTcwu3f4y",
  39:"price_1HUc7BKOFmCt70mTHow6lDUo",
  // prices 40-49$
  40:"price_1HUc7PKOFmCt70mTqoWMqaSC ",
  41:"price_1HUc97KOFmCt70mT6sIgF6JQ",
  42:"price_1HUc9IKOFmCt70mTRudgQfdq",
  43:"price_1HUc9SKOFmCt70mTjM0WFPyf",
  44:"price_1HUc9kKOFmCt70mTEZqMy2SZ",
  45:"price_1HUc9tKOFmCt70mTAMZezZ34",
  46:"price_1HUcA2KOFmCt70mTJtXxnXZj",
  47:"price_1HUcABKOFmCt70mTG6R9GzMe",
  48:"price_1HUcAKKOFmCt70mTCld7CVd8",
  49:"price_1HUcAUKOFmCt70mTZVJPnDnP",
  // prices 50-59$
  50:"price_1HUcB8KOFmCt70mTA3gzjGP9",
  51:"price_1HUcDDKOFmCt70mTQaUNaRom",
  52:"price_1HUcDNKOFmCt70mTD7oeVVzT",
  53:"price_1HUcDYKOFmCt70mTxw61CJ9F",
  54:"price_1HUcDmKOFmCt70mT3VskJbVB",
  55:"price_1HUcDzKOFmCt70mTahIRzOLO",
  56:"price_1HUcELKOFmCt70mTI0ofYn9H",
  57:"price_1HUcF6KOFmCt70mTqCNRYBKI",
  58:"price_1HUcFFKOFmCt70mTET3EbKXT",
  59:"price_1HUcFOKOFmCt70mTe3XMtdua",
  // prices 60-69$
  60:"price_1HUcFbKOFmCt70mTLKxfpK3N",
  61:"price_1HUcHmKOFmCt70mTKFzW8kqM",
  62:"price_1HUcHvKOFmCt70mT4kh7SLzX",
  63:"price_1HUcI5KOFmCt70mTi3ETaA1o",
  64:"price_1HUcIEKOFmCt70mTOrBo5sGL",
  65:"price_1HUcIMKOFmCt70mTROLhzYA6",
  66:"price_1HUcIYKOFmCt70mTnhX7NdEA",
  67:"price_1HUcIkKOFmCt70mTqVsguISP",
  68:"price_1HUcItKOFmCt70mT119KRSJS",
  69:"price_1HUcJ3KOFmCt70mTXZlWYA9j",
  // prices 70-79$
  70:"price_1HUcJCKOFmCt70mTQk4iQmte",
  71:"price_1HUcLHKOFmCt70mTcaqETXIL",
  72:"price_1HUcLSKOFmCt70mTZVo72joP",
  73:"price_1HUcLdKOFmCt70mTp8BLScMe",
  74:"price_1HUcLmKOFmCt70mTVyjGKvmJ",
  75:"price_1HUcM1KOFmCt70mTX7Do4GNX",
  76:"price_1HUcMBKOFmCt70mThOvhdoGX",
  77:"price_1HUcMLKOFmCt70mTvc6AjpEp",
  78:"price_1HUcMVKOFmCt70mTiYDLYVNl",
  79:"price_1HUcMiKOFmCt70mTt71U1syI",
  // prices 80-89$
  80:"price_1HUcMrKOFmCt70mTEmoz0uqT",
  81:"price_1HUcOmKOFmCt70mT11X9l4Lg",
  82:"price_1HUcOxKOFmCt70mTnsJ85NBs",
  83:"price_1HUcP7KOFmCt70mTDWHsKWps",
  84:"price_1HUcPHKOFmCt70mTXi2tbgHU",
  85:"price_1HUcPVKOFmCt70mTUTWKAwy0",
  86:"price_1HUcPhKOFmCt70mTPispMtvE",
  87:"price_1HUcPuKOFmCt70mT41V3rLHq",
  88:"price_1HUcQ4KOFmCt70mTbpkcvYJm",
  89:"price_1HUcQEKOFmCt70mTz9xhGPpq",
  // prices 90-99$
  90:"price_1HUcQNKOFmCt70mTQHulaS0k",
  91:"price_1HUcQXKOFmCt70mTyr0jERHw",
  92:"price_1HUcQjKOFmCt70mTE8fcRs1k",
  93:"price_1HUcjKKOFmCt70mThAnPnNKq",
  94:"price_1HUcjTKOFmCt70mTJGhRQmqG",
  95:"price_1HUcjeKOFmCt70mTFEsin7JH",
  96:"price_1HUcjnKOFmCt70mTUuUKm713",
  97:"price_1HUcjyKOFmCt70mTqeoQ2YQg",
  98:"price_1HUckAKOFmCt70mTsxB304Cj",
  99:"price_1HUckNKOFmCt70mTrpW2VHOa"
}

// let priceSelected;
// const lineItems = [];

// class classSelected {
//   constructor(price) {
//     this.price = price;
//     this.quantity = 1;
//     console.log("i am in class")
//   }
// }

// let lineItem ;

// $(document).ready(function () {
//   var range = $(".input-range"),
//     value = $(".range-value");

//   value.html(range.attr("value"));

//   range.on("input", function () {
//     const valueInt = parseInt(this.value);
//     value.html(valueInt);
//     console.log(valueInt);
    
//     if(valueInt===0){
//       console.log("cant be a zero")
//     } else {
//       priceSelected = stripePrices[valueInt];
//       // console.log(priceSelected);
//       // lineItem = new classSelected(priceSelected);
//       // lineItems.push(lineItem);
//       // console.log(lineItem);
//       console.log("hello class")
//       console.log("i went here");
//     // return priceSelected;
//     }
//     // console.log("i am about to print line item");
//     // console.log(lineItems);
    
    
//   });

//   //  lineItem = new classSelected(priceSelected);
//    console.log("i am in line item")
//       // lineItems.push(lineItem);
//       console.log(lineItem);
  
// });
// //


// // var signupButton = document.getElementsByClassName("btn-member");
// // var signupButton = document.getElementById("industryButton");

// // document.getElementById('form').addEventListener('submit', submitForm);

//   // const paymentButton = document.getElementById('submit');
//   // signupButton.onclick = submitForm();
// // signupButton.onclick = submitForm();

// function submitForm(event){
//    event.preventDefault();
//    lineItem = new classSelected(priceSelected);  
//    lineItems.push(lineItem);
//   console.log("button clicked");
//   payForMembership(lineItems);
  


// }

// // signupButton.onclick = function () {
// //   console.log("button clicked")
// //     console.log(lineItems);
// //     console.log(priceSelected);
// //   payForMembership(lineItems);
// //   console.log("done");
// // };


