import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const formData = {};

let getEl = selector => document.querySelector(selector);
getEl('.feedback-form').addEventListener('submit', onFormSubmit);
getEl('.feedback-form textarea').addEventListener(
  'input',
  throttle(onTextareaInput, 500)
);

getEl('.feedback-form').addEventListener('input', event => {
  formData[event.target.name] = event.target.value;
  //   console.log(formData);

  const dataOfKey = JSON.stringify(formData);
  localStorage.setItem(STORAGE_KEY, dataOfKey);
});

getEl('.feedback-form input');

populateTextarea();

function onFormSubmit(event) {
  event.preventDefault();
  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onTextareaInput(event) {
  const message = event.target.value;
  localStorage.setItem(STORAGE_KEY, message);
}

function populateTextarea() {
  const savedMessage = localStorage.getItem(STORAGE_KEY);
  const parsedMessage = JSON.parse(savedMessage);
  if (savedMessage) {
    if (parsedMessage.email) {
      getEl('.feedback-form input').value = parsedMessage.email;
      formData[getEl('.feedback-form input').name] = parsedMessage.email;
    }
    if (parsedMessage.message) {
      getEl('.feedback-form textarea').value = parsedMessage.message;
      formData[getEl('.feedback-form textarea').name] = parsedMessage.message;
    }
  }
}
