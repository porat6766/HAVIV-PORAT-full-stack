//create user
const createUser = async (username, email, password, age) => {
  const userData = {
    username,
    email,
    password,
    age,
  };
  try {
    await axios.post(`http://localhost:3001/api/users/create`, userData);
    return true;
  } catch (error) {
    console.error("Error creating user:", error);
    return false;
  }
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

export { createUser, getAccessUser };
