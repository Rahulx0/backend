const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        headline: {
            type: String,
            default: '',
        },
        summary: {
            type: String,
            default: '',
        },
        experiences: [
            {
                companyName: String,
                joiningDate: String,
                lastDate: String,
                description: String,
            },
        ],
        lastLogin: {
            type: Date,
        },
        skills: {
            type: [String],
            default: [],
        },
        education: {
            schoolName: String,
            session: String,
        },
    },
    {
        timestamps: true,
    }
);

const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;

