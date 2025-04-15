const express = require("express");
const { userLogin, registerUser} = require("../controllors/userController"); 

const router = express.Router();

router.post("/loginUser", userLogin);
router.post("/registerUser",registerUser)

module.exports = router;