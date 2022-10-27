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
  localStorage.setItem('STORAGE_KEY', dataOfKey);
});

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
  const saveMessage = localStorage.getItem(STORAGE_KEY);

  if (saveMessage) {
    console.log(saveMessage);
    getEl(STORAGE_KEY).value = saveMessage;
  }
}
