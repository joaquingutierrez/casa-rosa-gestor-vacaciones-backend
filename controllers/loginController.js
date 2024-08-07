const jwt = require("jsonwebtoken")
require("dotenv").config()

const User = require("../models/userShema")

const redirectIfLogin = function (req, res) {
    req.session.user ?
        res.redirect("/api/session/current") :
        res.render("login", { style: "/css/login.css" })
}

const login = async (req, res) => {
    const {email, password} = req.body
    try {
        if (!req.body) return res.status(400).send({ status: "error", error: "Invalid credentials" })
        const user = (email === process.env.ADMIN_USER_NAME && password === process.env.ADMIN_PASSWORD) ? {userName: "ADMIN", rol: "ADMIN"} : await User.findOne({ email: req.email })
        if (user) {
            const token = jwt.sign(user, process.env.JWT_SECRET, {
                expiresIn: "1h"
            })
            res
            .cookie("access_token", token, {
                httpOnly:true,
                maxAge: 1000*60*60
            })
            .status(200).json({ message: "success", user, token })
        } else {
        res.status(400).send({ status: "error", error: "User not found" })
        }

    }
    catch (err) {
        console.log(err)
    }
}

const failLogin = async (req, res) => {
    console.log("Failed Strategy")
    res.send({ error: "Failed" })
}

module.exports = {
    redirectIfLogin,
    login,
    failLogin
}