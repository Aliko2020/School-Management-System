const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/authorizeRoles');
const {
    createTeacher,
    getTeachers,
    deleteTeacher,
    getTeacherbyid
} = require('../controllors/teacherCrud');


router.get('/teachers',auth,authorizeRoles('admin'),getTeachers);
router.get('/teachers/:id',auth,authorizeRoles('teacher','admin'),getTeacherbyid)
router.post('/teachers',auth,authorizeRoles('admin'),createTeacher);
router.delete('/teachers/:id',auth,authorizeRoles('admin'),deleteTeacher);

module.exports = router