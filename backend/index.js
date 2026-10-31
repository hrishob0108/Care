require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const api = require("./routes");
const cors = require("cors");

const app = express();
app.use(cors());

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/CareCompanion";
const PORT = process.env.PORT || 3000;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

app.use(express.json());
app.use("/api", api);

app.get("/", (req, res) => {
  res.send("Hello, MongoDB with Express!");
});

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
