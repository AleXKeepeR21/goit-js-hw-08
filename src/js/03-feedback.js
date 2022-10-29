import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const formData = {};

let getEl = selector => document.querySelector(selector);
getEl('.feedback-form').addEventListener('submit', onFormSubmit);

getEl('.feedback-form').addEventListener('input', throttle(onFormInput, 500));

getEl('.feedback-form input');

populateTextarea();

function onFormInput(event) {
  formData[event.target.name] = event.target.value;

  const dataOfKey = JSON.stringify(formData);
  localStorage.setItem(STORAGE_KEY, dataOfKey);
}

function onFormSubmit(event) {
  event.preventDefault();
  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function populateTextarea() {
  const savedMessage = localStorage.getItem(STORAGE_KEY);
  const parsedMessage = JSON.parse(savedMessage);
  if (savedMessage) {
    getEl('.feedback-form input').value = parsedMessage.email || '';
    formData[getEl('.feedback-form input').name] = parsedMessage.email || '';

    getEl('.feedback-form textarea').value = parsedMessage.message || '';
    formData[getEl('.feedback-form textarea').name] =
      parsedMessage.message || '';
  }
}
