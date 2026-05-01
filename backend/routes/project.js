const router = require("express").Router();
const Project = require("../models/Project");
const authMiddleware = require("../middleware/authMiddleware");

// CREATE PROJECT
router.post("/", authMiddleware, async (req, res) => {
  try {
    const project = new Project({
      name: req.body.name,
      userId: req.user.id
    });

    const saved = await project.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json("Error");
  }
});

// GET ALL PROJECTS
router.get("/", authMiddleware, async (req, res) => {
  try {
    const projects = await Project.find({ userId: req.user.id });
    res.json(projects);
  } catch (err) {
    res.status(500).json("Error");
  }
});

module.exports = router;