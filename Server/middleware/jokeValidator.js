const validatorJoke = (req, res, next) => {
  if (!req.body.setup || !req.body.punchLine) {
    return res.status(400).send({
      massege: "missing fields",
    });
  }
  next();
};

export default validatorJoke;
