import express from "express";
import { controllerUsers } from "../controller/usersController.js";

import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/", controllerUsers.homePage);

router.get("/all", controllerUsers.getAllUser);

router.get("/random", controllerUsers.getRandomUser);

router.post("/create", controllerUsers.createUser);

router.post("/login", controllerUsers.loginUser);

router.get("/:id", controllerUsers.getUserByID);

router.patch("/update/part/:id", controllerUsers.updateAPartUser);

router.put("/update/:id", controllerUsers.updateAllUser);

router.delete("/delete/:id", controllerUsers.deleteUserByID);

export default router;
