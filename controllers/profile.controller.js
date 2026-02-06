const Profile = require('../models/profile.model');
const mongoose = require('mongoose');

const createProfile = async (req, res) => {
    try {
        const { headline, userId, summary, experiences, skills, education } = req.body;

        const profile = new Profile({
            userId,
            headline,
            summary,
            experiences: Array.isArray(experiences) ? experiences : experiences ? [experiences] : [],
            skills,
            education,
        });

        await profile.save();
        res.status(201).json({ message: 'Profile created successfully', profile });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message || 'Failed to create profile' });
    }
};

const getProfileByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: 'Invalid userId' });
        }
        const profile = await Profile.findOne({ userId });
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }
        res.status(200).json({ profile });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch profile' });
    }
};

const saveProfile = async (req, res) => {
    try {
        const { userId, headline, summary, experiences, skills, education, lastLogin } = req.body;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: 'Invalid userId' });
        }
        const normalizedSkills = Array.isArray(skills)
            ? skills
            : typeof skills === 'string'
                ? skills.split(',').map((s) => s.trim()).filter(Boolean)
                : [];

        const profile = await Profile.findOneAndUpdate(
            { userId },
            {
                headline: headline || '',
                summary: summary || '',
                experiences: Array.isArray(experiences) ? experiences : [],
                skills: normalizedSkills,
                education: education || {},
                lastLogin: lastLogin || undefined,
            },
            { new: true, upsert: true }
        );

        res.status(200).json({ message: 'Profile saved successfully', profile });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to save profile' });
    }
};

module.exports = { createProfile, getProfileByUserId, saveProfile };