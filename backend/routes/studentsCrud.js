const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware')
const authorizeRoles = require('../middleware/authorizeRoles');
const {
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
  getAllStudents 
} = require('../controllors/studentCrud'); 


router.get("/students/:id",auth, authorizeRoles('admin','student'),getStudent);
router.get("/students",auth,authorizeRoles('admin','teacher'), getAllStudents);
router.post("/students",auth,authorizeRoles('admin'), createStudent);
router.put("/students/:id",auth, authorizeRoles('admin','student','teacher'),updateStudent);
router.delete("/students/:id",auth, authorizeRoles('admin'),deleteStudent);

module.exports = router;