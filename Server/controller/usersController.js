import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const hashKey = process.env.HashKey;
const secretKey = hashKey;
console.log(secretKey);

const JWT_KEY = process.env.JWT_KEY;
const JWT_EXPIRATION = { expiriesIn: "1h" };

const hashPassword = async (userPassword) => {
  const saltRounds = 10;
  const combinedPassword = userPassword + secretKey;
  return await bcrypt.hash(combinedPassword, saltRounds);
};

const comparePassword = async (userPassword, dbHash) => {
  const combinedPassword = userPassword + secretKey;
  return await bcrypt.compare(combinedPassword, dbHash);
};

const homePage = (req, res) => {
  res.send("page-users");
};

const getAllUser = async (req, res) => {
  try {
    const allUser = await User.find();
    res.status(200).send(allUser);
  } catch (error) {
    console.error("Error fetching all users:", error);
    res.status(500).send("Internal Server Error");
  }
};

const getRandomUser = async (req, res) => {
  try {
    const randomUser = await User.aggregate([{ $sample: { size: 1 } }]);
    res.status(200).send(randomUser[0]);
  } catch (error) {
    console.error("Error fetching random user:", error);
    res.status(500).send("Internal Server Error");
  }
};

const createUser = async (req, res) => {
  try {
    const hashValuePassword = await hashPassword(req.body.password);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashValuePassword,
      age: req.body.age,
    });

    await newUser.save();
    res.status(201).send({
      message: "User created successfully!",
      id: newUser._id,
    });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).send("Internal Server Error");
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email });
    console.log(foundUser);

    if (!foundUser) {
      return res.status(404).send({ message: "User not found!" });
    }

    const isAuth = await comparePassword(password, foundUser.password);
    const { _id, username } = foundUser;
    const filteredUser = { _id, username };
    if (!isAuth) {
      return res.status(401).send({ message: "Invalid password!" });
    }

    res.status(200).send({
      message: "User logged in successfully!",
      message: isAuth,
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).send("Internal Server Error");
  }
};

const getUserByID = async (req, res) => {
  const { id } = req.params;
  try {
    const foundUser = await User.findById(id).populate("totalJoke");

    if (!foundUser) {
      return res.status(404).send({
        message: `No user found with id ${id}`,
      });
    }

    res.status(200).send(foundUser);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const updateAPartUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, age, password } = req.body;

  const fieldsToUpdate = {};

  if (username) {
    fieldsToUpdate.username = username;
  }

  if (email) {
    fieldsToUpdate.email = email;
  }

  if (typeof age === "number") {
    fieldsToUpdate.age = age;
  }

  if (typeof password === "number") {
    fieldsToUpdate.password = password;
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(id, fieldsToUpdate, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).send({ message: "User not found" });
    } else {
      res.status(200).send(updatedUser);
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res
      .status(500)
      .send({ message: "Internal Server Error", error: error.message });
  }
};

const updateAllUser = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    console.log(updatedUser);

    if (updatedUser) {
      console.log(updatedUser);
      res.status(200).send(updatedUser);
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "An error occurred", error: error.message });
  }
};

const deleteUserByID = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (deletedUser) {
      res.status(200).send("User deleted successfully");
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "An error occurred", error: error.message });
  }
};

export const controllerUsers = {
  getRandomUser,
  homePage,
  createUser,
  getUserByID,
  updateAPartUser,
  updateAllUser,
  deleteUserByID,
  getAllUser,
  loginUser,
};
