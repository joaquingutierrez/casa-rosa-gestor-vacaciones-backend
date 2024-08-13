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
        await newEmployee.save()
        res.json(newEmployee)
    }
    catch (err) {
        if (err.name === 'MongoServerError' && err.code === 11000) {
            return res.status(409).json({
                message: 'El DNI ya está registrado.'
            });
        }
        res.status(500).json({ message: "Error al crear el empleado: " + err })
    }
}

const getEmployeeById = async (req, res) => {
    const { id } = req.params;
    try {
        const employee = await Employee.findById(id);
        if (!employee) {
            return res.status(404).send('Employee not found');
        }
        res.json(employee);
    } catch (err) {
        res.status(500).send('Server Error');
    }
}

module.exports = {
    getEmployees,
    createEmployee,
    getEmployeeById
}