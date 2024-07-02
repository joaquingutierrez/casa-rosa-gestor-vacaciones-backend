const mongoose = require("mongoose");

const { Schema } = mongoose;

const vacationSchema = new Schema({
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'id', required: true },
    startDate: Date,
    endDate: Date
});

module.exports = mongoose.model('Vacation', vacationSchema);