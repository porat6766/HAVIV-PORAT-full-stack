// import { model } from "./models/jokeModel.js";
// import { view } from "./view.js";
import { userModel } from "./models/userModel.js";

// const loadAllJokesButton = document.getElementById("get-all-joke");
// const loadRandomJokeButton = document.getElementById("get-random-joke");
// const userIdInput = document.getElementById("user-id");

// Element sign up
const formSignUp = document.getElementById("form-sign-up");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const ageInput = document.getElementById("age");

// Element sign in
const formSignIn = document.getElementById("form-sign-in");
const passwordSignIn = document.getElementById("password");
const emailSignIn = document.getElementById("email");
const messageSignIn = document.getElementById("loginMessage");

if (formSignUp) {
  formSignUp.addEventListener("submit", (event) => {
    event.preventDefault();
    const dataIsSave = userModel.createUser(
      usernameInput.value,
      emailInput.value,
      passwordInput.value,
      ageInput.value
    );
    console.log(dataIsSave);
    if (dataIsSave) window.location.href = "./html-file/sign-in.html";
  });
  (usernameInput.value = ""),
    (emailInput.value = ""),
    (passwordInput.value = ""),
    (ageInput.value = "");
}

if (formSignIn) {
  formSignIn.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const body = { email: emailSignIn.value, password: passwordSignIn.value };

    const loginResponse = await userModel.getAccessUser(body);
    console.log(loginResponse);
    if (!loginResponse) {
      messageSignIn.textContent = "The email or password is incorrect";
    } else {
      window.location.href = "menuPage.html";
    }
  });
}

// const loadJokes = async () => {
//   try {
//     const jokes = await model.fetchJokes();
//     view.renderJokes(jokes);
//   } catch (error) {
//     console.error("Error fetching jokes:", error);
//   }
// };

// loadAllJokesButton.addEventListener("click", loadJokes);
