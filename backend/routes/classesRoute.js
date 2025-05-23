const express = require('express')
const auth = require('../middleware/authMiddleware')
const authorizeRoles = require('../middleware/authorizeRoles')
const { getClasses
        
 } = require('../controllors/classesCrud')




const router = express.Router()

router.get('/',auth,authorizeRoles('admin'),getClasses);

module.exports = router