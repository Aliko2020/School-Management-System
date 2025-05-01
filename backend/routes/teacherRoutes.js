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


router.get('/',auth,authorizeRoles('admin'),getTeachers);
router.get('/:id',auth,authorizeRoles('teacher','admin'),getTeacherbyid)
router.post('/',auth,authorizeRoles('admin'),createTeacher);
router.delete('/:id',auth,authorizeRoles('admin'),deleteTeacher);

module.exports = router