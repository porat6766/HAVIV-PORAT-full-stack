import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.headers[" authorization"];
  if (!token) res.status(403).send("Token Missing");

  jwt.verify(token, process.env.JWT_KEY, (err, decode) => {
    if (err) return res.status(401).send("Invalid Token");
    req.userid = decode._id;
    next();
  });
};
