const express = require('express');
const rolRouter = express.Router();
const { getRols, createRol, updateRol } = require("../controllers/rolController")

rolRouter.get('/', getRols);
rolRouter.put('/:id', updateRol);
rolRouter.post('/', createRol);

module.exports = rolRouter;