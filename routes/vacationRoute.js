const express = require('express');
const vacationRouter = express.Router();
const { getVacations, createVacation, createVacationWithoutLimit, getVacationsByDate, getVacationsByEmployeeId, deleteVacation } = require("../controllers/vacationController");
const auth = require('../middlewares/auth');

vacationRouter.get('/', getVacations);
vacationRouter.post('/date', getVacationsByDate);
vacationRouter.post('/', auth, createVacation);
vacationRouter.post('/withoutLimit', auth, createVacationWithoutLimit)
vacationRouter.get('/:employeeId', getVacationsByEmployeeId);
vacationRouter.delete('/:vacationId', auth, deleteVacation);

module.exports = vacationRouter;