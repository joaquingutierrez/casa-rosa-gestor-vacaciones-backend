const express = require('express');
const employeeRouter = express.Router();
const { getEmployees, createEmployee, getEmployeeById } = require("../controllers/employeeController");
const auth = require('../middlewares/auth');

employeeRouter.get('/', getEmployees);
employeeRouter.post('/', auth, createEmployee);
employeeRouter.get('/:id', getEmployeeById);

module.exports = employeeRouter;