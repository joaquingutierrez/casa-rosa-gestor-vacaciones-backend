const express = require('express');
const vacationRouter = express.Router();
const { getVacations, createVacation, getVacationsByEmployeeId } = require("../controllers/vacationController")

vacationRouter.get('/', getVacations);
vacationRouter.post('/', createVacation);
vacationRouter.get('/:employeeId', getVacationsByEmployeeId);

module.exports = vacationRouter;