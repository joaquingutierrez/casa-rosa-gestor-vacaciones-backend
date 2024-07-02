const mongoose = require("mongoose");

const { Schema } = mongoose;

const vacationSchema = new Schema({
    employeeId: { type: mongoose.Schema.Types.ObjectId, required: true },
    rolId: { type: mongoose.Schema.Types.ObjectId, required: true },
    startDate: Date,
    endDate: Date
});

module.exports = mongoose.model('Vacation', vacationSchema);