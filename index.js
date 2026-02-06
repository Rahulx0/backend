//setup the server
const express = require('express');
//will allow to read envioement variables from .env file
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const postRoutes = require('./routes/post.routes'); 
const userRoutes = require('./routes/user.routes');
const cookieParser = require('cookie-parser');
const profileRoutes = require('./routes/profile.routes');
const createComment = require('./routes/comments.routes');
const app = express();

app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:5173', methods: ['GET','POST','PUT','DELETE']}));


//application level middleware
app.use(express.json());

const startServer = async () => {
    try {
        //mongo => connection string
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 10000
        });
        console.log('Connected to MongoDB');
        app.use("/api", postRoutes);
        app.use("/api", userRoutes);
        app.use("/api", profileRoutes);
        app.use("/api", createComment);
        app.get("/", (req, res) => {
            res.send("Welcome to Linkdin Clone Backend");
        });

        module.exports = app;
    } catch (err) {
        console.log("MongoDB connection error:", err.message);
        process.exit(1);
    }
};

startServer();