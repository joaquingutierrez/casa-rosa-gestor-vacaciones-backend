const express = require('express');
const vacationRouter = express.Router();
const { getVacations, createVacation } = require("../controllers/vacationController")

vacationRouter.get('/', getVacations);
vacationRouter.post('/', createVacation);

module.exports = vacationRouter;