const Employee = require("../models/employeeShema");
const Vacation = require("../models/vacationSchema");
const { updateYear_current, updateYear_next } = require("../utils");

const updateEmployees_daysTaken = async (employees) => {
    for (const emp of employees) {
        const restartVacationsDate = new Date(emp.restartVacationsDays_Date)
        const todayDate = new Date()
        if (restartVacationsDate <= todayDate) {
            if (emp.daysTaken <= 14) {
                emp.daysTaken = 0
            } else {
                emp.daysTaken -= 14
            }
            emp.currentVacationsDays_Date = emp.restartVacationsDays_Date
            emp.restartVacationsDays_Date = updateYear_next(restartVacationsDate)
            const empData = {
                currentVacationsDays_Date: emp.currentVacationsDays_Date,
                restartVacationsDays_Date: emp.restartVacationsDays_Date,
                daysTaken: emp.daysTaken
            }
            await Employee.findByIdAndUpdate(emp._id, empData)
        }
    }
}

const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        await updateEmployees_daysTaken(employees)
        res.json(employees);
    } catch (err) {
        res.status(500).send('Server Error');
    }
}

const calculateDaysToTake = async (req, res) => {
    const { id } = req.params
    let accum = 14
    try {
        const vacations = await Vacation.find({ employeeId: id })
        const employee = await Employee.findById(id)
        const vacationsRange_start = employee.currentVacationsDays_Date
        const vacationsRange_end = employee.restartVacationsDays_Date
        for (const dates of vacations) {
            const startDate = new Date(dates.startDate)
            const endDate = new Date(dates.endDate)
            let currentDate = new Date(startDate)
            while (currentDate <= endDate) {
                if (currentDate >= vacationsRange_start && currentDate <= vacationsRange_end) {
                    accum -= 1;
                }
                currentDate.setDate(currentDate.getDate() + 1)
            }
        }
        res.status(200).json({daysLeft: accum})
    }
    catch (err) {
        console.log(err)
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
    const restartVacationsDays_Date = updateYear_next(joiningDate)
    const currentVacationsDays_Date = updateYear_current(joiningDate)
    try {
        const newEmployee = new Employee({
            firstName,
            lastName,
            dni,
            street,
            nro,
            birdthDate,
            joiningDate,
            currentVacationsDays_Date,
            restartVacationsDays_Date,
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

const updateEmployee = async (req, res) => {
    const { id } = req.params
    const { data } = req.body
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(id, data, { new: true })
        res.status(200).json(updatedEmployee)
    }
    catch (err) {
        res.status(500).json({ message: "Error al editar el empleado: " + err })
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

const deleteEmployee = async (req, res) => {
    const { id } = req.params;
    try {
        const employee = await Employee.findByIdAndDelete(id);
        res.status(200).json(employee);
    } catch (err) {
        res.status(500).send('Server Error');
    }
}

module.exports = {
    getEmployees,
    createEmployee,
    updateEmployee,
    getEmployeeById,
    deleteEmployee,
    calculateDaysToTake
}