//setup the server
const express = require('express');
//will allow to read environment variables from .env file
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const postRoutes = require('./routes/post.routes');
const userRoutes = require('./routes/user.routes');
const cookieParser = require('cookie-parser');
const profileRoutes = require('./routes/profile.routes');
const createComment = require('./routes/comments.routes');
const app = express();

let isConnected = false;
const connectDB = async () => {
    if (isConnected) return;
    await mongoose.connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 10000
    });
    isConnected = true;
    console.log('Connected to MongoDB');
};

app.use(cookieParser());
app.use(cors({ credentials: true, origin: 'http://localhost:5173', methods: ['GET', 'POST', 'PUT', 'DELETE'] }));

//application level middleware
app.use(express.json());

// Ensure DB connection for serverless
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (err) {
        console.log("MongoDB connection error:", err.message);
        res.status(500).json({ error: 'Database connection failed' });
    }
});

app.use("/api", postRoutes);
app.use("/api", userRoutes);
app.use("/api", profileRoutes);
app.use("/api", createComment);
app.get("/", (req, res) => {
    res.send("Welcome to Linkdin Clone Backend");
});

// register -> (POST) http://localhost:4000/api/register
if (!process.env.VERCEL) {
    app.listen(process.env.PORT, () => {
        console.log('Server is running on port ', process.env.PORT);
    });
}

module.exports = app;