const express = require('express');
const router = express.Router();

const {
    createTeacher,
    getTeachers,
    deleteTeacher,
    getTeacherbyid
} = require('../controllors/teacherCrud')

router.get('/teachers',getTeachers);
router.get('/teachers/:id',getTeacherbyid)
router.post('/teachers',createTeacher);
router.delete('/teachers/:id',deleteTeacher);

module.exports = router