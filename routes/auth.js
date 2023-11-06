const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


// Register a new user
router.get('/register', (req, res) => {
    res.render('signup');
});
router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userService.registerUser(email, password);
        res.status(200).json({ message: 'Registration successful', user });
    } catch (error) {
        res.status(400).json({ message: 'User registration failed', error: error.message });
    }
});

// Login
router.get('/login', (req, res) => {
    res.render('login');
});
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userService.authenticateUser(email, password);

        if (!user) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        const token = jwt.sign({ email: user.email }, secretKey);

        res.cookie('authToken', token);
        res.json({ success: true, message: 'Login successful', user, redirectUrl: '/dashboard' });
    } catch (error) {
        res.status(401).json({ message: 'Authentication failed', error: error.message });
    }
});

module.exports = router;