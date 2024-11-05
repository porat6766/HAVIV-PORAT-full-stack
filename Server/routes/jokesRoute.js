import express from "express";
import { controllerJoke } from "../controller/jokesController.js";
import validatorJoke from "../middleware/jokeValidator.js";

const router = express.Router();

router.get("/", controllerJoke.homePage);

router.get("/all", controllerJoke.getAllJokes);

router.get("/random", controllerJoke.getRandonJoke);

router.post("/create", validatorJoke, controllerJoke.createJoke);

router.get("/:id", controllerJoke.getJokeByID);

router.patch("/update/part/:id", controllerJoke.updateAPartJoke);

router.put("/update/:id", validatorJoke, controllerJoke.updateAllJoke);

router.delete("/delete/:id", controllerJoke.daeleteJokeByID);

export default router;
