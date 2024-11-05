

const renderJokes = (jokes) => {
  const jokesList = document.getElementById("jokes-list");
  jokesList.innerHTML = "";
  jokes.forEach((joke) => {
    const liJoke = document.createElement("li");
    liJoke.classList.add("liJoke");
    liJoke.innerHTML = `
        <h3>Joke numberId=${joke._id}</h3>
        <p>setup:${joke.setup}</p>
        <p>punchLine:${joke.punchLine}</p>
      `;
    jokesList.appendChild(liJoke);
  });
};

export const view = {
  renderJokes,
};
