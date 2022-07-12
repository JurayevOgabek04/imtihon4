let elForm = document.querySelector(".form__login");
let elUsernameInput = document.querySelector(".user-input");
let elPasswordInput = document.querySelector(".password-input");
let elError = document.querySelector(".error__div");
let elLogin = document.querySelector(".submit__btn");

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  let UsernameValue = elUsernameInput.value;
  let PasswordValue = elPasswordInput.value;

  fetch("https://reqres.in/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: UsernameValue,
      password: PasswordValue,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data?.token) {
        window.localStorage.setItem("token", data.token);
        window.location.replace("about.html");
        elLogin.style.backgroundColor = "green";
      } else {
        elError.classList.remove("hidden");
      }
    });
  elUsernameInput.value = "";
  elPasswordInput.value = "";
});
elUsernameInput.addEventListener("keydown", function () {
  elUsernameInput.style.Color = "black"
  elLogin.style.backgroundColor = "white";
});
elPasswordInput.addEventListener("keydown", function () {
    elUsernameInput.style.Color = "black"
    elLogin.style.backgroundColor = "white";
});



