const express = require('express')
const auth = require('../middleware/authMiddleware')
const authorizeRoles = require('../middleware/authorizeRoles')
const {
    addParent,
    getParents,
    getParentById,
    deleteParent
} = require('../controllors/parentCrud')

const router = express.Router()

router.get('/',auth,authorizeRoles('admin'),getParents)
router.get('/:id',auth,getParentById)
router.post('/',auth,authorizeRoles('student','admin'),addParent)
router.delete('/:id',auth,authorizeRoles('admin'),deleteParent)

module.exports = router