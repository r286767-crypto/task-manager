const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header) {
      return res.status(401).json("No token");
    }

    const token = header.split(" ")[1];

    if (!token) {
      return res.status(401).json("No token, access denied");
    }

    const verified = jwt.verify(token, "secret");

    console.log("Decoded user:", verified); // 🔍 debug

    req.user = verified;
    next();
  } catch (err) {
    console.log(err);
    res.status(400).json("Invalid token");
  }
};

module.exports = authMiddleware;