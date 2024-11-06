const APICallCreateUser = async (body) => {
  try {
    await axios.post(`http://localhost:3001/api/users/create`, body);
    console.log("User created successfully");
  } catch (error) {
    console.error("Error creating user:", error);
  }
};

const createUser = async (username, email, password, age) => {
  const userData = {
    username: username,
    email: email,
    password: password,
    age: age,
  };
  console.log(userData);

  await APICallCreateUser(userData);
  return true;
};

//authontocation user
const getAccessUser = async (body) => {
  try {
    await axios.post(`http://localhost:3001/api/users/login`, body);
    console.log("User in successfully");
    return true;
  } catch (error) {
    console.error("Error access user:", error);
    return false;
  }
};

export const userModel = {
  createUser,
  getAccessUser,
};
