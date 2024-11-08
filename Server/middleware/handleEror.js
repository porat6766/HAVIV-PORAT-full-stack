const errorHandle = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: "Internal Server Error" });
};

export default errorHandle;
