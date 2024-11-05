const EndPallJokes = "all";
const EndPRandom = "random";

let EndPoint = EndPallJokes;
const fetchJokes = async () => {
  const response = await axios.get(
    `http://localhost:3001/api/jokes/${EndPoint}`
  );
  return response.data;
};

export const model = {
  fetchJokes,
  EndPoint,
};
