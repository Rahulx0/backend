//express 
const express = require('express');
const { createPost, getAllPosts,likePost,commentOnPost } = require('../controllers/post.controller');
//router
const router = express.Router();

router.post("/createPost",createPost);
router.get("/getAllPosts", getAllPosts);
router.post("/likePost", likePost);
router.post("/commentOnPost", commentOnPost);
module.exports = router;