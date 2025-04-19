const express = require('express');
const router = express.Router();

const {
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
  getAllStudents 
} = require('../controllors/studentController'); 


router.get("/students/:id", getStudent);
router.get("/students", getAllStudents);
router.post("/students", createStudent);
router.put("/students/:id", updateStudent);
router.delete("/students/:id", deleteStudent);

module.exports = router;