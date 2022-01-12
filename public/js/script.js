//hide-show visibility of sidemenu icons
const mobileBtn = document.getElementById('mobile-cta');
nav = document.querySelector('nav');
mobileBtnExit = document.getElementById('mobile-exit');

mobileBtn.addEventListener('click', () => {
  nav.classList.add('menu-btn');
  document.getElementById('mobile-cta').style.visibility = 'hidden';
});

mobileBtnExit.addEventListener('click', () => {
  nav.classList.remove('menu-btn');
  document.getElementById('mobile-cta').style.visibility = 'visible';
});

//sidemenu closing on link click
const sideMenu = document.getElementById('sidemenu');

sideMenu.addEventListener('click', () => {
  nav.classList.remove('menu-btn');
  document.getElementById('mobile-cta').style.visibility = 'visible';
});

//animation of intro
const text = document.querySelector('.intro');
const strText = text.textContent;
const splitText = strText.split('');
text.textContent = '';

for (let i = 0; i < splitText.length; i++) {
  text.innerHTML += '<span>' + splitText[i] + '</span>';
}

let char = 0;
let timer = setInterval(onTick, 50);

function onTick() {
  const span = text.querySelectorAll('span')[char];
  span.classList.add('fade');
  char++;
  if (char === splitText.length) {
    complete();
    return;
  }
}

function complete() {
  clearInterval(timer);
  timer = null;
}

//validation of the contact form
const form = document.getElementById('contact-form');
const usrName = document.getElementById('name');
const mail = document.getElementById('email');
const sbj = document.getElementById('subject');
const msg = document.getElementById('message');
// const usrNameValue = usrName.value.trim();
// const mailValue = mail.value.trim();
// const sbjValue = sbj.value.trim();
// const msgValue = msg.value.trim();

form.addEventListener('submit', (e) => {
  e.preventDefault();

  validateInputs();
});

validateInputs = () => {
  const usrNameValue = usrName.value.trim();
  const mailValue = mail.value.trim();
  const sbjValue = sbj.value.trim();
  const msgValue = msg.value.trim();

  if (usrNameValue === '') {
    setErrorFor(usrName, 'Name cannot be blank');
  } else {
    setSuccessFor(usrName);
  }

  if (mailValue === '') {
    setErrorFor(mail, 'Email cannot be blank');
  } else if (!isEmail(mailValue)) {
    setErrorFor(mail, 'Email is not valid');
  } else {
    setSuccessFor(mail);
  }

  if (sbjValue === '') {
    setErrorFor(sbj, 'Subject cannot be blank');
  } else {
    setSuccessFor(sbj);
  }

  if (msgValue === '') {
    setErrorFor(msg, 'Message cannot be blank');
  } else {
    setSuccessFor(msg);
  }
};

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector('small');

  small.innerText = message;
  formControl.className = 'form-control error';
}

function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

function isEmail(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
