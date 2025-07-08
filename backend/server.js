const express = require("express");
const notes = require("./data/notes");
const dotenv = require("dotenv");
// // const { connect } = require("mongoose");

dotenv.config();
// const connectDB = require("./config/db");
// connectDB();
const app = express();
// const noteRoutes = require("./routers/noteRoutes");
// app.use("/api/notes", noteRoutes);

app.get("/", (req, res) => {
  res.send("API is running..");
});

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.get("/api/notes/:id", (req, res) => {
  const note = notes.find((n) => n._id === req.params.id);

  res.send(note);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server started in port ${PORT}`));
