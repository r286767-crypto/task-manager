console.log("SERVER RUNNING CLEAN");

const express = require("express");
const mongoose = require("mongoose");
const app = express();



app.use(express.json());
mongoose.connect("mongodb+srv://r286767_db_user:r7760340301@cluster0.1wt6wfc.mongodb.net/?retryWrites=true&w=majority")
.then(() => console.log("DB connected"))
.catch(err => console.log(err));

// ✅ import route
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/task");
const projectRoutes = require("./routes/project");


// ✅ use route
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);
app.use("/projects", projectRoutes);

// test root
app.get("/", (req, res) => {
  res.send("API running");
});



const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});