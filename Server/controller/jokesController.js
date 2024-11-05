import Joke from "../models/jokesModel.js";

const homePage = (req, res) => {
  res.send("page-jokes");
};

const getAllJokes = async (req, res) => {
  try {
    const allJoke = await Joke.find();
    if (allJoke.length === 0) {
      res.status(404).send("Joke not found");
    } else {
      res.status(200).send(allJoke);
    }
  } catch (error) {
    console.error("Error fetching all joke:", error);
    res.status(500).send("Internal Server Error");
  }
};

const getRandonJoke = async (req, res) => {
  try {
    const randomJoke = await Joke.aggregate([{ $sample: { size: 1 } }]);
    res.status(200).send(randomJoke[0]);
  } catch (error) {
    console.error("Error fetching random joke:", error);
    res.status(500).send("Internal Server Error");
  }
};

const createJoke = (req, res) => {
  const newJoke = new Joke({
    setup: req.body.setup,
    punchLine: req.body.punchLine,
    owner: req.body.owner,
  });

  newJoke
    .save()
    .then(() =>
      res.status(200).send({
        message: "Good job!!!",
        id: newJoke._id,
      })
    )
    .catch((error) => {
      console.error("Error saving joke:", error);
      res.status(500).send("Internal Server Error");
    });
};

const getJokeByID = async (req, res) => {
  try {
    const { id } = req.params;
    const foundJoke = await Joke.findById(id);

    if (!foundJoke) {
      return res.status(404).send({
        message: `No joke found with id ${id}`,
      });
    }

    res.status(200).send(foundJoke);
  } catch (error) {
    console.error("Error fetching joke:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const updateAPartJoke = async (req, res) => {
  try {
    const { id } = req.params;
    const { setup, punchLine } = req.body;

    const fieldToUpdate = {};

    if (setup) {
      fieldToUpdate.setup = setup;
    }

    if (punchLine !== undefined) {
      fieldToUpdate.punchLine = punchLine;
    }

    const updateJoke = await Joke.findByIdAndUpdate(id, fieldToUpdate, {
      new: true,
    });

    if (!updateJoke) {
      return res.status(404).send({ message: "Joke not found" });
    }

    res.status(200).send(updateJoke);
  } catch (error) {
    console.error("Error updating joke:", error);
    res
      .status(500)
      .send({ message: "Internal Server Error", error: error.message });
  }
};

const updateAllJoke = async (req, res) => {
  try {
    const { id } = req.params;
    const updateJoke = await Joke.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (updateJoke) {
      res.status(200).send(updateJoke);
    } else {
      res.status(404).send({ message: "Joke not found" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "An error occurred", error: error.message });
  }
};

const daeleteJokeByID = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedJoke = await Joke.findByIdAndDelete(id);

    if (deletedJoke) {
      res.status(200).send("Joke deleted");
    } else {
      res.status(404).send({ message: "Joke not found" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "An error occurred", error: error.message });
  }
};

export const controllerJoke = {
  getAllJokes,
  getRandonJoke,
  homePage,
  createJoke,
  getJokeByID,
  updateAPartJoke,
  updateAllJoke,
  daeleteJokeByID,
};
