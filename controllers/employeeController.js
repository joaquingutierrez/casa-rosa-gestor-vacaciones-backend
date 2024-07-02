const Employee = require("../models/employeeShema")

const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (err) {
        res.status(500).send('Server Error');
    }
}
const createEmployee = async (req, res) => {
    console.log(req.body)
    const {
        firstName,
        lastName,
        dni,
        street,
        nro,
        birdthDate,
        joiningDate,
        rol
    } = req.body
    try {
        const newEmployee = new Employee({
            firstName,
            lastName,
            dni,
            street,
            nro,
            birdthDate,
            joiningDate,
            rol
        })
        newEmployee.save()
        res.json(newEmployee)
    }
    catch (err) {
        console.log(err)
    }
}

module.exports = {
    getEmployees,
    createEmployee
}