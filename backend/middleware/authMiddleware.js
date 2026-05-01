const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
   const header = req.headers.authorization;

if (!header) {
  return res.status(401).json("No token");
}

const token = header.split(" ")[1]; // extract token after Bearer

    if (!token) {
      return res.status(401).json("No token, access denied");
    }

    const verified = jwt.verify(token, "secret");

    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json("Invalid token");
  }
};

module.exports = authMiddleware;