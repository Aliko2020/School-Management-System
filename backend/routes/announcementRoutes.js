const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/authorizeRoles');
const {
  createAnnouncement,
  getAllAnnouncements,
  updateAnnouncement,
  deleteAnnouncement
} = require('../controllors/announcementCrud');


router.get('/', auth, authorizeRoles('admin', 'teacher', 'student', 'parent'), getAllAnnouncements);
router.post('/', auth, authorizeRoles('admin', 'teacher'), createAnnouncement);
router.put('/:id', auth, authorizeRoles('admin'), updateAnnouncement);
router.delete('/:id', auth, authorizeRoles('admin'), deleteAnnouncement);

module.exports = router;
