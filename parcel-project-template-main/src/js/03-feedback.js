import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageTextarea = form.querySelector('textarea[name="message"]');
const localStorageKey = 'feedback-form-state';

const saveStateToLocalStorage = throttle(() => {
  const state = {
    email: emailInput.value,
    message: messageTextarea.value,
  };
  localStorage.setItem(localStorageKey, JSON.stringify(state));
}, 500);

const loadStateFromLocalStorage = () => {
  const savedState = localStorage.getItem(localStorageKey);
  if (savedState) {
    const parsedState = JSON.parse(savedState);
    emailInput.value = parsedState.email || '';
    messageTextarea.value = parsedState.message || '';
  }
};

form.addEventListener('input', () => {
  saveStateToLocalStorage();
});

window.addEventListener('load', () => {
  loadStateFromLocalStorage();
});

form.addEventListener('submit', event => {
  event.preventDefault();

  localStorage.removeItem(localStorageKey);
  emailInput.value = '';
  messageTextarea.value = '';

  console.log('Form submitted with data:', {
    email: emailInput.value,
    message: messageTextarea.value,
  });
});
