const express = require('express');
const User = require('../models/User');

const router = express.Router();

// Define your routes here
router.post('/register', async (req, res) => {
    try {
        let userData = req.body;
        // Create a new user using the User schema
        const newUser = new User(userData);
        // Save the user to the database
        await newUser.save();
        res.json({ success: true, message: 'User registered successfully' });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        // Find the user with the provided email
        const user = await User.findOne({ email });
        if (!user) {
            res.json({ success: false, message: 'Invalid email or password' });
            return;
        }
        // Check if the provided password matches the user's password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            res.json({ success: false, message: 'Invalid email or password' });
            return;
        }
        res.json({ success: true, message: 'User logged in successfully', user: user._id });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

module.exports = router;