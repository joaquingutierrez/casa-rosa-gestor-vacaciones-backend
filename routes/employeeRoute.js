const express = require('express');
const employeeRouter = express.Router();
const { getEmployees, createEmployee, getEmployeeById } = require("../controllers/employeeController")

employeeRouter.get('/', getEmployees);
employeeRouter.post('/', createEmployee);
employeeRouter.get('/:id', getEmployeeById);

module.exports = employeeRouter;