const express = require('express')
const auth = require('../middleware/authMiddleware')
const authorizeRoles = require('../middleware/authorizeRoles')

const { getFeeReport,
        getFeeByStudentId,
      } = require('../controllors/feesReport')


const router = express.Router()

router.get('/',auth,authorizeRoles('admin'),getFeeReport);
router.get('/:id',getFeeByStudentId);



module.exports = router