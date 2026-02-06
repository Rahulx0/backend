//express 
const express = require('express');
//router
const router = express.Router();

const { createComment } = require('../controllers/comment.controller');
router.post("/createComment", createComment);
module.exports = router;