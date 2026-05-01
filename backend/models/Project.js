const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: String,
  userId: String // who created it
});

module.exports = mongoose.model("Project", projectSchema);