const router = require("express").Router();
const Task = require("../models/Task");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");


// ✅ CREATE TASK
router.post("/", authMiddleware, async (req, res) => {
  try {
    const task = new Task({
       user: req.user.id,
      title: req.body.title,
 
  
 
});
    const savedTask = await task.save();
    res.json(savedTask);
  } catch (err) {
    console.log(err); 
    res.status(500).json("Error");
  }
});


// ✅ GET ALL TASKS (only user’s tasks)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id});
    res.json(tasks);
  } catch (err) {
    res.status(500).json("Error");
  }
});

router.get("/all", authMiddleware, adminMiddleware, async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// GET TASKS BY PROJECT
router.get("/project/:projectId", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({
      projectId: req.params.projectId,
      userId: req.user.id
    });

    res.json(tasks);
  } catch (err) {
    res.status(500).json("Error");
  }
});


// ✅ UPDATE TASK
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },   // ✅ THIS LINE CHANGED
      { new: true }
    );

    res.json(updatedTask);
  } catch (err) {
    res.status(500).json("Error");
  }
});


// ✅ DELETE TASK
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json("Task deleted");
  } catch (err) {
    res.status(500).json("Error");
  }
});

module.exports = router;