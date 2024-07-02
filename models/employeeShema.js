const mongoose = require("mongoose")
const { Schema } = mongoose;

const employeeSchema = new Schema({
    firstName: String,
    lastName: String,
    dni: {type: Number, unique: true, require: true},
    street: String,
    nro: String,
    birdthDate: Date,
    joiningDate: {type: Date, require: true},
    daysTaken: Number,
    rol: { type: mongoose.Schema.Types.ObjectId, ref: 'desc', required: true }
});

module.exports = mongoose.model('Employee', employeeSchema);