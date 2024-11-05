// const EndPallJokes = "all";

// let EndPoint = EndPallJokes;
const fetchJokesAll = async (EndPoint) => {
  // console.log(EndPoint);

  const response = await axios.get(
    `http://localhost:3001/api/jokes/${EndPoint}`
  );
  return response.data;
};

export const jokeModel = {
  fetchJokesAll,
  // EndPoint,
};
