const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
    const token = req.cookies.access_token || req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        console.log("Error, token no provided")
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = data; // Guarda el usuario decodificado en req.user
    } catch (err) {
        console.log("Error, invalid Token")
        return res.status(401).json({ message: 'Invalid token' });
    }

    next();
};

module.exports = auth;