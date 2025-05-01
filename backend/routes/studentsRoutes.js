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


router.get("/:id",auth, authorizeRoles('admin','student'),getStudent);
router.get("/",auth,authorizeRoles('admin','teacher'), getAllStudents);
router.post("/",auth,authorizeRoles('admin'), createStudent);
router.put("/:id",auth, authorizeRoles('admin'),updateStudent);
router.delete("/:id",auth, authorizeRoles('admin'),deleteStudent);

module.exports = router;