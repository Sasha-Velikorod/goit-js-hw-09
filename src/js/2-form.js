const formData = { email: '', message: '' };
const formEl = document.querySelector('.feedback-form');
const KEY_STORAGE = 'feedback-form-state';

const getDataFromLs = key => {
  const dataLs = localStorage.getItem(key);
  return dataLs === null ? undefined : JSON.parse(dataLs);
};

const renderPage = () => {
  const savedData = getDataFromLs(KEY_STORAGE);
  if (!savedData) return;

  formData.email = savedData.email;
  formData.message = savedData.message;

  formEl.elements.email.value = formData.email;
  formEl.elements.message.value = formData.message;
};

const onInput = e => {
  formData[e.target.name] = e.target.value.trim();
  localStorage.setItem(KEY_STORAGE, JSON.stringify(formData));
};

const onSubmit = e => {
  e.preventDefault();

  const { email, message } = e.currentTarget.elements;

  if (!email.value.trim() || !message.value.trim()) {
    return alert('Fill please all fields');
  }

  const userData = {
    email: email.value.trim(),
    message: message.value.trim(),
  };

  console.log(userData);

  localStorage.removeItem(KEY_STORAGE);
  e.currentTarget.reset();

  formData.email = '';
  formData.message = '';
};

formEl.addEventListener('input', onInput);
formEl.addEventListener('submit', onSubmit);
renderPage();
