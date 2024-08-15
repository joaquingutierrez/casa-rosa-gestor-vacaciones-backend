const express = require('express');
const employeeRouter = express.Router();
const { getEmployees, createEmployee, updateEmployee, getEmployeeById, deleteEmployee } = require("../controllers/employeeController");
const auth = require('../middlewares/auth');

employeeRouter.get('/', getEmployees);
employeeRouter.post('/', auth, createEmployee);
employeeRouter.put('/:id', auth, updateEmployee);
employeeRouter.get('/:id', getEmployeeById);
employeeRouter.delete('/:id', auth, deleteEmployee);

module.exports = employeeRouter;