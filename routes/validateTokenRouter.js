const express = require('express');
const validateTokenRouter = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

validateTokenRouter.post('/', (req, res) => {
    const token = req.cookies.access_token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.json({ user: decoded });
    } catch (err) {
        console.error('Error verifying token', err);
        res.status(401).json({ message: 'Invalid token' });
    }
});

module.exports = validateTokenRouter;