const express = require('express');
const loginRouter = express.Router();
const { redirectIfLogin, login, failLogin } = require("../controllers/loginController")


loginRouter.get("", redirectIfLogin)
loginRouter.post("", login)
loginRouter.get("/faillogin", failLogin)

module.exports = loginRouter