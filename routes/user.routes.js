//express 
const express = require('express');
const { signup, signin } = require('../controllers/user.constrollers');
//router
const router = express.Router();

router.post("/register",signup);
//export
router.post("/signin",signin);

module.exports = router;