// write the business logic 
const User = require('../models/User.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// importing dcrypt library
//controller for signup
// ->, async , await
// store a user - > mongodb user model
// server (index.js) - > mongodb server (to store a user)
const signup = async (req, res) => {
    try {
        

        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(409).json({ message: 'User already exists with this email' });
            }
        const hashedPassword = await bcrypt.hash(password, 10);
        // creating a new user
        const user = new User({
            username,
            email,
            password: hashedPassword
        });
        // save the user
        await user.save();

        return res.status(201).json({
            message: 'User registered successfully',
            user: user
        });
    }

    catch (err) {
        console.log("err", err.message);
        return res.status(500).json({ message: err.message || 'Signup failed' });
    }
}

// sigin controller 

const signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User does not exist with this email ' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid password, Try again' });
        }



const tokenData = {
            id: user._id,
          //  email: user.email
        };

        const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

        res.cookie('token', token, {httpOnly: true});
        console.log("Generated JWT Token:", token);
        
        const loginTime = new Date();
        user.lastLogin = loginTime;
        await user.save();


        
        return res.status(200).json({
            message: 'User signed in successfully',
            user: user,
            token: token
        });

    }
    catch (err) {
        console.log("err", err.message);
        return res.status(500).json({ message: err.message });
    }
}

module.exports = { signup, signin };