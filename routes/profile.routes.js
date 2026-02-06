//express 
const express = require('express');
//router
const router = express.Router();

const { createProfile, getProfileByUserId, saveProfile } = require('../controllers/profile.controller');
router.post("/create", createProfile);
router.get("/profile/:userId", getProfileByUserId);
router.post("/profile/save", saveProfile);

module.exports = router;