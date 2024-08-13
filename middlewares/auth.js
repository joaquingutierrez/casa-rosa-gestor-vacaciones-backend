const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
    const token = req.cookies.access_token || req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(403).json({ message: 'No inició sesión' });
    }

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = data;
    } catch (err) {
        return res.status(403).json({ message: 'La sesión ha expirado' });
    }

    next();
};

module.exports = auth;