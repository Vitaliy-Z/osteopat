const appointBtnEl = document.querySelector(".js-appointment-btn");
const modalEl = document.querySelector(".js-modal");
const modalCloseBtnEl = modalEl.querySelector(".js-modal-close-btn");
const formEl = modalEl.querySelector(".js-modal-form");
const LS_KEY = "form-state";
const formData = JSON.parse(localStorage.getItem(LS_KEY)) || {
  name: "",
  phone: "",
  date: "",
  time: ""
};

for (const key in formData) {
  formEl.elements[key].value = formData[key];
}

const toggleModal = () => {
  modalEl.classList.toggle("is-open");
};

const sendForm = (obj) => console.log(obj);

const onInput = ({ target: { name, value } }) => {
  formData[name] = value.trim();
  localStorage.setItem(LS_KEY, JSON.stringify(formData));
};

const onSubmit = (evt) => {
  evt.preventDefault();

  if (
    formData.name === "" ||
    formData.phone === "" ||
    formData.date === "" ||
    formData.time === ""
  ) {
    return alert("Для відправки форми потрібно заповнити всі поля");
  }

  sendForm(formData);

  formEl.reset();
  localStorage.removeItem(LS_KEY);

  for (const key in formData) {
    formData[key] = "";
  }
};

appointBtnEl.addEventListener("click", toggleModal);
modalCloseBtnEl.addEventListener("click", toggleModal);
modalEl.addEventListener("click", (evt) => {
  if (evt.target === modalEl || evt.target === modalCloseBtnEl) {
    toggleModal();
  }
});

formEl.addEventListener("input", onInput);
formEl.addEventListener("submit", onSubmit);
