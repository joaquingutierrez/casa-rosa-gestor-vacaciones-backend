const mongoose = require("mongoose");

const { Schema } = mongoose;

const vacationSchema = new Schema({
    employeeId: mongoose
    startDate: Date,
    endDate: Date
});

module.exports = mongoose.model('Vacation', vacationSchema);