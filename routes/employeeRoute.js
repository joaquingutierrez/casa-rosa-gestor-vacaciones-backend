const express = require('express');
const employeeRouter = express.Router();
const { getEmployees, createEmployee } = require("../controllers/employeeController")

employeeRouter.get('/', getEmployees);
employeeRouter.post('/', createEmployee);

module.exports = employeeRouter;