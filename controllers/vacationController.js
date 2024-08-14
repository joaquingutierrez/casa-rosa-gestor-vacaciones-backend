const Vacation = require("../models/vacationSchema");
const Employee = require("../models/employeeShema")
const { validationDate, validationVacationsDays_basedOnTimeInPlace } = require("../utils");

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


        if (!validationVacationsDays_basedOnTimeInPlace(employee, startDate, endDate)) {
            return res.status(400).json({ message: 'El empleado no lleva el tiempo suficiente para tomarse estas vacaciones en estas fechas. O ya no tiene dias disponisbles' })
        }
        employee.daysTaken += Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));

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

const getVacationsByDate = async (req, res) => {
    const date = new Date(req.body.date)
    const vacationsList = []

    try {
        const vacations = await Vacation.find()
        for (const vacation of vacations) {
            const startDate = new Date(vacation.startDate)
            const endDate = new Date(vacation.endDate)
            if (date >= startDate && date <= endDate) {
                vacationsList.push(vacation)
            }
        }
        res.status(200).send(vacationsList)
    }
    catch (err) {
        res.status(500).send("Error en el servidor")
    }
}

module.exports = {
    getVacations,
    createVacation,
    getVacationsByDate,
    getVacationsByEmployeeId
}