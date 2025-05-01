const express = require("express");
const { 
    registerStudent,
    studentLogin,
    registerTeacher,
    teacherLogin,
    registerAdmin,
    adminLogin
} = require("../controllors/userAuth"); 

const router = express.Router();

router.post("/loginStudent", studentLogin);
router.post("/registerStudent",registerStudent);
router.post("/loginTeacher",teacherLogin);
router.post("/registerTeacher",registerTeacher);
router.post('/admin/login', adminLogin);
router.post('/admin/register', registerAdmin);


module.exports = router;