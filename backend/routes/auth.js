const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");
// REGISTER
router.post("/register", async (req, res) => {
  try {
    console.log(req.body); // optional debug

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    });

    res.json(newUser);
  } catch (err) {
    console.log(err);
    res.status(500).json("Error");
  }
});
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(400).json("User not found");

    const valid = await bcrypt.compare(req.body.password, user.password);

    if (!valid) return res.status(400).json("Wrong password");

    const token = jwt.sign(
  { id: user._id, role: user.role },
  "secret"
);

    res.json({ token });

  } catch (err) {
    res.status(500).json("Error");
  }
});

router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user
  });
});

module.exports = router;