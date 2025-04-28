// backend/server.js
require('dotenv').config(); 
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000
const pool = require("./config/database");
const userRouter = require("./routes/userAuth");
const studentRouter = require("./routes/studentsCrud");
const teacherRouter = require("./routes/teacherCrud");
const logger = require("./middleware/loggerMiddleware")
const errorhandler = require('./middleware/errorMiddleware')


app.use(cors());
app.use(express.json());

app.use(logger)
app.use("/api/users", userRouter);
app.use("/api/students", studentRouter);
app.use("/api/teachers",teacherRouter);


app.get("/", (req, res) => {
  res.send("API is running");
});

app.use(errorhandler)
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
