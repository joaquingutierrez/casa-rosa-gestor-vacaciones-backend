const Vacation = require("../models/vacationSchema");
const { validationDate } = require("../utils");

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
        const vacationsList = await Vacation.find()
        if (!validationDate(startDate, endDate, vacationsList)) return res.status(500).send('Server Error')
        const newVacation = new Vacation({ employeeId, startDate, endDate })
        newVacation.save()
        res.json(newVacation);
    }
    catch (err) {
        console.log(err)
    }
}

module.exports = {
    getVacations,
    createVacation
}