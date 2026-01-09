const User = require('../models/User');
const passport = require('passport');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
    const { name, email, password, businessName, city } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({
            name,
            email,
            password,
            businessName,
            city
        });

        if (user) {
            req.login(user, (err) => {
                if (err) throw err;
                res.status(201).json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    businessName: user.businessName,
                    city: user.city
                });
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const loginUser = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(400).json({ message: info.message });

        req.logIn(user, (err) => {
            if (err) return next(err);
            return res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                businessName: user.businessName,
                city: user.city
            });
        });
    })(req, res, next);
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
const logoutUser = (req, res) => {
    req.logout((err) => {
        if (err) return res.status(500).json({ message: 'Logout failed', error: err.message });
        res.status(200).json({ message: 'Logged out successfully' });
    });
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
const getMe = (req, res) => {
    if (req.user) {
        res.json(req.user);
    } else {
        res.status(401).json({ message: 'Not authorized' });
    }
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getMe
};
