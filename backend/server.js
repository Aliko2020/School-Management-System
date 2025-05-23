require('dotenv').config(); 
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000
const userRouter = require("./routes/userAuth");
const parentRouter = require('./routes/parentRoute')
const studentRouter = require("./routes/studentsRoutes");
const teacherRouter = require("./routes/teacherRoutes");
const announcementRouter = require('./routes/announcementRoutes');
const feesRouter = require('./routes/feesRoute')
const classesRouter = require('./routes/classesRoute')
const logger = require("./middleware/loggerMiddleware");
const errorhandler = require('./middleware/errorMiddleware');



app.use(cors());
app.use(express.json());

app.use(logger)
app.use("/api/users", userRouter);
app.use("/api/students", studentRouter);
app.use("/api/teachers",teacherRouter);
app.use('/api/announcements', announcementRouter);
app.use('/api/parent',parentRouter)
app.use("/api/fees",feesRouter)
app.use("/api/classes",classesRouter);


app.get("/", (req, res) => {
  res.send("API is running");
});

app.use(errorhandler)
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
