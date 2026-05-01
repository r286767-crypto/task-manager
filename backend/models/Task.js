const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // who created it
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
   projectId: { type: String, required: true } 
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);