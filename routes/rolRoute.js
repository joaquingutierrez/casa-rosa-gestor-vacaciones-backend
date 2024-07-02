const express = require('express');
const rolRouter = express.Router();
const { getRols, createRol } = require("../controllers/rolController")

rolRouter.get('/', getRols);
rolRouter.post('/', createRol);

module.exports = rolRouter;