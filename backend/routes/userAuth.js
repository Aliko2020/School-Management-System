const express = require("express");
const { 
    registerStudent,
    studentLogin,
    registerTeacher,
    teacherLogin
} = require("../controllors/userAuth"); 

const router = express.Router();

router.post("/loginStudent", studentLogin);
router.post("/registerStudent",registerStudent);
router.post("/loginTeacher",teacherLogin);
router.post("/registerTeacher",registerTeacher);

module.exports = router;