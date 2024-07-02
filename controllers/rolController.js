const Rol = require("../models/rolSchema")

const getRols = async (req, res) => {
    try {
        const rol = await Rol.find();
        res.json(rol);
    } catch (err) {
        res.status(500).send('Server Error');
    }
}
const createRol = async (req, res) => {
    console.log(req.body)
    const { desc } = req.body;


    try {
        const newRol = new Rol({desc})
        newRol.save()
        res.json(newRol);
    }
    catch (err) {
        console.log(err)
    }

}

module.exports = {
    getRols,
    createRol
}