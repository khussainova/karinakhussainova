const contactForm = document.querySelector('.contact-left');
let fname = document.getElementById('name');
let email = document.getElementById('email');
let subject = document.getElementById('subject');
let message = document.getElementById('message');
let notification = document.getElementById('notification');
let paragraph = document.getElementById('feedback-message');
const closeNotificationBtn = document.getElementById('closing-btn');
const notificationWrapper = document.getElementById('notification-wrapper');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  let formData = {
    name: fname.value,
    email: email.value,
    subject: subject.value,
    message: message.value,
  };

  let xhr = new XMLHttpRequest();
  xhr.open('POST', '/');

  xhr.setRequestHeader('content-type', 'application/json');
  xhr.onload = function () {
    console.log(xhr.responseText);
    if (xhr.responseText == 'success') {
      isSent(
        'Thank you for contacting me! I will get back in touch as soon as I can!'
      );
      fname.value = '';
      email.value = '';
      subject.value = '';
      message.value = '';
    } else {
      notSent(
        'Something went wrong! You can contact me by clicking "Get in Touch" button better!'
      );
    }
  };
  xhr.send(JSON.stringify(formData));
});

function isSent(message) {
  paragraph.innerText = message;
  notification.className = 'notification success';
  document.getElementById('notification-wrapper').style.display = 'block';

  closeNotificationBtn.addEventListener('click', () => {
    notification.className = 'notification success hide';
  });
}

function notSent(message) {
  paragraph.innerText = message;
  notification.className = 'notification error';
  document.getElementById('notification-wrapper').style.display = 'block';

  closeNotificationBtn.addEventListener('click', () => {
    notification.className = 'notification error hide';
  });
}
