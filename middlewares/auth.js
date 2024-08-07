const jwt = require("jsonwebtoken")
require("dotenv").config()

const auth = (req, res, next) => {
    const token = req.cookies.access_token
    let data = null

    req.session = {user: null}
    try {
        data = jwt.verify(token, process.env.JWT_SECRET)
        req.session.user = data
    } catch(err) {
        req.session.user = null
    }
    next()
}

module.exports = auth