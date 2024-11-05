// const fetchUser = async () => {
//   const response = await axios.get(
//     `http://localhost:3001/api/user/${EndPoint}`
//   );
//   return response.data;
// };

//create user
const createAxiosUser = async (body) => {
  try {
    await axios.post(`http://localhost:3001/api/users/create`, body);
    console.log("User created successfully");
  } catch (error) {
    console.error("Error creating user:", error);
  }
};

const createUser = (username, email, password, age) => {
  const userData = {
    username: username,
    email: email,
    password: password,
    age: age,
  };
  createAxiosUser(userData);
};

//authontocation user
const getAccessUser = async (body) => {
  try {
    await axios.post(`http://localhost:3001/api/users/login`, body);
    console.log("User in successfully");
  } catch (error) {
    console.error("Error access user:", error);
  }
};

export const userModel = {
  createUser,
  getAccessUser,
};
