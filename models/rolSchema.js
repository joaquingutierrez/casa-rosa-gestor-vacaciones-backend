const mongoose = require("mongoose")
const { Schema } = mongoose;

const rolSchema = new Schema({
    desc: {type: String, unique: true}
});

module.exports = mongoose.model('Rol', rolSchema);