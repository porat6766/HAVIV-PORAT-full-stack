import { userModel } from "./models/userModel.js";
import { jokeModel } from "./models/jokeModel.js";
import { view } from "./view.js";

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

// Element menu page
const getUserJokesButton = document.getElementById("get-user-jokes");
const getRandomJokeButton = document.getElementById("get-random-joke");
const getAllJokesButton = document.getElementById("get-all-jokes");
const addWindowButton = document.getElementById("add-window");
const addJokeForm = document.getElementById("add-joke-form");
const jokeSetupInput = document.getElementById("joke-setup");
const jokePunchlineInput = document.getElementById("joke-punchline");

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

//toggle hidden addJoke
addWindowButton.addEventListener("click", () => {
  addJokeForm.classList.toggle("hidden");
});

//get User Jokes Button
getAllJokesButton.addEventListener("click", async () => {
  try {
    const jokes = await jokeModel.fetchJokesAll("all");
    view.renderJokes(jokes);
    console.log(jokes);
  } catch (error) {
    console.log("error");
  }
});

//get random Jokes Button
getRandomJokeButton.addEventListener("click", async () => {
  try {
    const jokes = await jokeModel.fetchJokesAll("random");
    view.renderJokes([jokes]);
    console.log(jokes);
  } catch (error) {
    console.log("error");
  }
});

//get random Jokes Button
