const express = require("express");
const dotenv = require("dotenv");
const conectDB = require("./config/db");
const userRoutes = require("./routers/userRouters");
const noteRoutes = require("./routers/noteRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

const app = express();
dotenv.config();
conectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(5000, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
