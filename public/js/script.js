var y= document.getElementById("source");

var x=y.options[y.selectedIndex].value;
var z=y.options[y.selectedIndex].text;
console.log(x);

var educationS= document.getElementById("closePlease");

function checkSource(){
    console.log("i was clicked")
    console.log(x);
    if (x=="university"){
        console.log("i cook meatballs today")
        $('#closePlease').hide();
    }
    else if(x=="industry"){
        console.log("i wanna go out")
        $('#closePlease').show();
    }
};








// industry form validation
const indForm = document.getElementById("indForm");
const indName = document.getElementById("indName");
const indEmail = document.getElementById("indEmail");
const indPhone = document.getElementById("indPhone");
const company = document.getElementById("company");
const industry = document.getElementById("industry");
const indPrefContact = document.getElementById("indPrefContact");
const indInterest = document.getElementById("indInterest");
const education = document.getElementById("education");
const indSeeking = document.getElementById("indSeeking");
// const indFee =document.getElementById("indFee");








// university form validation
// const uniForm = document.getElementById("uniForm");
// const uniName = document.getElementById("uniName");
// const uniEmail = document.getElementById("uniEmail");
// const uniPhone = document.getElementById("uniPhone");
// const university = document.getElementById("university");
// const yearProgram = document.getElementById("yearProgram");
// const uniPrefContact = document.getElementById("uniPrefContact");
// const uniInterest = document.getElementById("uniInterest");
// const uniMentor = document.getElementById("uniMentor");

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





  
  // Get field name
  function getFieldName(input) {
    return input.name.charAt(0).toUpperCase() + input.name.slice(1);
  }
//   function valUnivForm(){
//     checkRequired([
//         uniName,
//         uniEmail,
//          uniPrefContact,
//         uniInterest,
//         uniMentor,
//       ]);
      
//       isNameValid(uniName);
//       checkLength(uniName, 3, 30);
//       checkPhone(uniPhone);
//        isValidEmail(uniEmail);
//       };
function valIndForm(){
        checkRequired([
            indName,
            indEmail,
            indPrefContact,
            indInterest,
            indSeeking,
          ]);
          
          isNameValid(indName);
          checkLength(indName, 3, 30);
          checkPhone(indPhone);
           isValidEmail(indEmail);
          }; 
          
indForm.addEventListener("click",function(e){
              // function validateIndustryForm(e){
            console.log("i am here")
              e.preventDefault();
              valIndForm(); });
    

  
// Event Listeners
// console.log(uniForm);
uniForm.addEventListener("submit",function(e){
  // function validateIndustryForm(e){
console.log("i am here")
  e.preventDefault();
  valUnivForm(); });
    