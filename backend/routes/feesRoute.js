const express = require('express')

const { getFeeReport,
        getFeeByStudentId 
      } = require('../controllors/feesReport')


const router = express.Router()

router.get('/',getFeeReport);
router.get('/:id',getFeeByStudentId)


module.exports = router