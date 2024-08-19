const express = require('express');
const employeeRouter = express.Router();
const { getEmployees, createEmployee, updateEmployee, getEmployeeById, deleteEmployee, calculateDaysToTake } = require("../controllers/employeeController");
const auth = require('../middlewares/auth');

employeeRouter.get('/', getEmployees);
employeeRouter.post('/', auth, createEmployee);
employeeRouter.put('/:id', auth, updateEmployee);
employeeRouter.get('/:id', getEmployeeById);
employeeRouter.get('/:id/daysleft', calculateDaysToTake);
employeeRouter.delete('/:id', auth, deleteEmployee);

module.exports = employeeRouter;