// backend/server.js
require('dotenv').config(); 
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000
const pool = require("./config/database");
const userRouter = require("./routes/userAuth");
const studentRouter = require("./routes/studentsCrud");


app.use(cors());
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/students", studentRouter);


app.get("/", (req, res) => {
  res.send("API is running");
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
