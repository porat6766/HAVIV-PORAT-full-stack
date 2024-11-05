const renderJokes = (jokes) => {
  const jokesDisplay = document.getElementById("jokes-display");
  jokesDisplay.innerHTML = "";

  jokes.forEach((joke) => {
    const liJoke = document.createElement("li");
    liJoke.classList.add("li-joke-item");
    liJoke.innerHTML = `
      <div class="joke-content">
        <h3 class="joke-number">Joke owner: ${joke.owner}</h3>
        <p class="joke-setup">Setup: ${joke.setup}</p>
        <p class="joke-punchline">Punchline: ${joke.punchLine}</p>
      </div>
    `;
    jokesDisplay.appendChild(liJoke);
  });
};

export const view = {
  renderJokes,
};
