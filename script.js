document.addEventListener('DOMContentLoaded', () => {
  generateBgImage();
});

// background image change with page load
const bgImage = document.getElementById('image');
const bgButton = document.getElementById('bgChange');

bgButton.addEventListener('click', generateBgImage);
function generateBgImage() {
  // assigning url to src of background image
  fetch('https://picsum.photos/1200/1200')
    .then((res) => res.blob())
    .then((blob) => {
      bgImage.src = URL.createObjectURL(blob);
    });

  // var url = 'https://picsum.photos/1200/1200';
  // bgImage.src = url;

  setInterval(() => {
    generateBgImage();
  }, 60000);
}

// LogIn/SignUp Form taking all input
const loginForm = document.querySelector('.logIn');
const signupForm = document.querySelector('.signUp');
const btn = document.querySelector('.btn');

const loginPageLoad = document.querySelector('.logInPage');
const loginUsername = document.getElementById('loginUsername');
const loginPassword = document.getElementById('loginPassword');

const signupPageLoad = document.querySelector('.signUpPage');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const passwordCheck = document.getElementById('passwordCheck');

//toggle between login and sign up page
loginPageLoad.addEventListener('click', (e) => {
  e.preventDefault();

  //change background of active button to color and other to transparent
  loginPageLoad.style.backgroundColor = '#e01537';
  signupPageLoad.style.backgroundColor = 'transparent';

  //making hidden  signup form visible login form
  loginForm.style.display = 'block';
  signupForm.style.display = 'none';
});

signupPageLoad.addEventListener('click', (e) => {
  e.preventDefault();

  //change background of active button to color and other to transparent
  signupPageLoad.style.backgroundColor = '#e01537';
  loginPageLoad.style.backgroundColor = 'transparent';

  //making hidden  login form visible signup form
  signupForm.style.display = 'block';
  loginForm.style.display = 'none';
});

//validation for input in both form

var loginEl1 = false;
var loginEl2 = false;
// login form validation
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  //check input function declaration
  checkLoginInput();
});

//function to check input validity
function checkLoginInput() {
  //value from input
  const loginUsernameValue = loginUsername.value.trim();
  const loginPasswordValue = loginPassword.value.trim();

  //username validation
  if (loginUsernameValue === '') {
    // show error and add error class
    setErrorFor(loginUsername, 'user name is empty');
  } else if (loginUsernameValue.length < 4) {
    setErrorFor(loginUsername, 'name is too short');
  } else if (loginUsernameValue.length > 15) {
    setErrorFor(loginUsername, 'name is too long');
  } else {
    loginEl1 = true;
    setSuccessFor(loginUsername);
  }

  //password validation
  if (loginPasswordValue === '') {
    // show error and add error class
    setErrorFor(loginPassword, 'password is empty');
  } else if (loginPasswordValue.length < 7) {
    setErrorFor(loginPassword, 'password should contain minimum 6 digit');
  } else if (loginPasswordValue.length > 16) {
    setErrorFor(loginPassword, 'password should contain maximum 16 digit');
  } else if (!upperLowerCase(loginPasswordValue)) {
    setErrorFor(
      loginPassword,
      'password should contain both upper and lower case'
    );
  } else if (!numbers(loginPasswordValue)) {
    setErrorFor(loginPassword, 'password should contain 1 numbers');
  } else if (!specialChar(loginPasswordValue)) {
    setErrorFor(password, 'password should contain 1 special Character');
  } else {
    loginEl2 = true;
    setSuccessFor(loginPassword);
  }
  if (loginEl1 === true && loginEl2 === true) {
    setSuccessSubmit('Login');
  }
}

//sign up button validation

var signUpEl1 = false;
var signUpEl2 = false;
var signUpEl3 = false;
var signUpEl4 = false;

signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  checkSignUpInput();
});

function checkSignUpInput() {
  //get value from input
  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const passwordCheckValue = passwordCheck.value.trim();

  //username validation
  if (usernameValue === '') {
    // show error and add error class
    setErrorFor(username, 'user name is empty');
  } else if (usernameValue.length < 4) {
    setErrorFor(username, 'name is too short');
  } else if (usernameValue.length > 15) {
    setErrorFor(username, 'name is too long');
  } else if (specialChar(usernameValue)) {
    setErrorFor(username, 'name should not contain special characters');
  } else if (!userNameValid(usernameValue)) {
    setErrorFor(
      username,
      'name should contain 1 number, 1uppercase, 1lowercase characters'
    );
  } else {
    signUpEl1 = true;
    setSuccessFor(username);
  }

  //email validation
  if (emailValue === '') {
    // show error and add error class
    setErrorFor(email, 'email is empty');
  } else if (!isEmail(emailValue)) {
    setErrorFor(email, 'enter valid email');
  } else {
    signUpEl2 = true;
    setSuccessFor(email);
  }

  //password validation
  if (passwordValue === '') {
    // show error and add error class
    setErrorFor(password, 'password is empty');
  } else if (passwordValue.length < 7) {
    setErrorFor(password, 'password should contain minimum 6 digit');
  } else if (passwordValue.length > 16) {
    setErrorFor(password, 'password should contain maximum 16 digit');
  } else if (!upperLowerCase(passwordValue)) {
    setErrorFor(password, 'password should contain both upper and lower case');
  } else if (!numbers(passwordValue)) {
    setErrorFor(password, 'password should contain 1 numbers');
  } else if (!specialChar(passwordValue)) {
    setErrorFor(password, 'password should contain 1 special Character');
  } else {
    signUpEl3 = true;
    setSuccessFor(password);
  }

  //matching password
  if (passwordCheckValue === '') {
    // show error and add error class
    setErrorFor(passwordCheck, 'password is empty');
  } else if (passwordCheckValue !== passwordValue) {
    setErrorFor(passwordCheck, 'passwords does not match');
  } else {
    signUpEl4 = true;
    setSuccessFor(passwordCheck);
  }

  if (
    signUpEl1 === true &&
    signUpEl2 === true &&
    signUpEl3 === true &&
    signUpEl4 === true
  ) {
    setSuccessSubmit('Signed-up');
  }
}

// different function to check different one by one validation for password
function specialChar(pswd) {
  return /[!@#$%^&*]/g.test(pswd);
}
function upperLowerCase(pswd) {
  return /[a-z]/g.test(pswd) && /[A-Z]/g.test(pswd);
}
function numbers(pswd) {
  return /[0-9]/g.test(pswd);
}

// function to check all validation in single go for password
function PasswordValid(pswd) {
  return /^[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(pswd);
}

//name validation
function userNameValid(name) {
  return /^[a-zA-Z0-9]{3,15}$/.test(name);
}

//email validation
function isEmail(email) {
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
    email
  );
}

// display error msg for given input
function setErrorFor(input, msg) {
  const formControl = input.parentElement;
  const small = formControl.querySelector('small');
  //add msg to small
  small.innerText = msg;
  //add class error
  formControl.className = 'form-control error';
}

// if validation successful just show by right mark
function setSuccessFor(input) {
  const formControl = input.parentElement;
  //add class success
  formControl.className = 'form-control success';
}

// if all validation are successful then show msg
function setSuccessSubmit(msg) {
  //add msg to small
  const smallMsg = document.querySelector('.smallMsg');
  smallMsg.outerHTML = `Congratulations you have ${msg} successfully !!!`;
  setTimeout(() => {
    location.reload();
  }, 2000);
}
