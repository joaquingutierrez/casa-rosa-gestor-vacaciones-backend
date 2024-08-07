const express = require('express');
const logoutRouter = express.Router();
const { logout } = require("../controllers/logoutController")


logoutRouter.post("", logout)

module.exports = logoutRouter