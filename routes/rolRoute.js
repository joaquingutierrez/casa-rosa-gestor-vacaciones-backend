const express = require('express');
const rolRouter = express.Router();
const { getRols, createRol, updateRol } = require("../controllers/rolController");
const auth = require('../middlewares/auth');

rolRouter.get('/', getRols);
rolRouter.put('/:id', auth, updateRol);
rolRouter.post('/', auth, createRol);

module.exports = rolRouter;