const User = require('../models/User');

const authController = {
    login: (req, res) => {
        res.render('login');
    },
    signup: (req, res) => {
        res.render('signup');
    },
    registerUser: (req, res) => {
        const { email, password } = req.body;

        // Check if the user already exists (by email)
        User.findByEmail(email)
            .then(existingUser => {
                if (existingUser) {
                    return res.status(400).json({ message: 'Email is already registered' });
                }

                // If the user doesn't exist, create a new user
                const newUser = new User(null, email, password);

                // Save the new user to the database
                newUser.save()
                    .then(user => {
                        res.status(200).json({ message: 'Registration successful', user });
                    })
                    .catch(err => {
                        res.status(400).json({ message: 'User registration failed', error: err.message });
                    });
            })
            .catch(err => {
                res.status(500).json({ message: 'User registration failed', error: err.message });
            });
    },
};

module.exports = authController;