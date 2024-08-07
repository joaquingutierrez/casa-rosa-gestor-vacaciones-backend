const mongoose = require("mongoose")
const { Schema } = mongoose;

const userSchema = new Schema({
    userName: String,
    password: String,
    firstName: String,
    lastName: String,
    dni: {type: Number, unique: true, require: true},
    street: String,
    nro: String,
    birthDate: Date,
    joiningDate: {type: Date, require: true},
    daysTaken: {type: Number, default: 0},
    rol: { type: mongoose.Schema.Types.ObjectId, ref: 'desc', required: true }
});

module.exports = mongoose.model('User', userSchema);