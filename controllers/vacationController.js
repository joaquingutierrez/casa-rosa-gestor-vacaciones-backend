const Vacation = require("../models/vacationSchema");
const Employee = require("../models/employeeShema")
const { validationDate, validationDaysTaken } = require("../utils");

const getVacations = async (req, res) => {
    try {
        const vacations = await Vacation.find();
        res.json(vacations);
    } catch (err) {
        res.status(500).send('Server Error');
    }
}
const createVacation = async (req, res) => {
    const { employeeId, startDate, endDate } = req.body;
    try {
        const employee = await Employee.findById(employeeId)
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        const vacationsList = await Vacation.find()
        const rolId = employee.rol
        const rolCondition = (rol2) => rolId.toString() === rol2.toString()

        if (!validationDate(startDate, endDate, vacationsList, rolCondition)) {
            return res.status(400).json({ message: 'Invalid vacation dates' });
        }

        employee.daysTaken += Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));

        if (!validationDaysTaken(employee)) {
            return res.status(400).json({ message: 'Invalid days taken' });
        }

        employee.save()
        const newVacation = new Vacation({ employeeId, rolId, startDate, endDate })
        newVacation.save()
        res.json(newVacation);
    }
    catch (err) {
        console.log(err)
    }
}

const getVacationsByEmployeeId = async (req, res) => {
    const { employeeId } = req.params

    try {
        const vacations = await Vacation.find({ employeeId: employeeId })
        res.json(vacations);
    }
    catch (err) {
        console.log(err)
    }
}

module.exports = {
    getVacations,
    createVacation,
    getVacationsByEmployeeId
}