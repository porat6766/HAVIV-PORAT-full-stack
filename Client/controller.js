import { model } from "./model.js";
import { view } from "./view.js";

const loadAllJokesButton = document.getElementById("get-all-joke");
const loadRandomJokeButton = document.getElementById("get-random-joke");
const userIdInput = document.getElementById("user-id");

const loadJokes = async () => {
  try {
    const jokes = await model.fetchJokes();
    view.renderJokes(jokes);
  } catch (error) {
    console.error("Error fetching jokes:", error);
  }
};

loadAllJokesButton.addEventListener("click", loadJokes);
