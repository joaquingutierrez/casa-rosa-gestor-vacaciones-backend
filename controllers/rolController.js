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
    const { desc } = req.body;

    try {
        const newRol = new Rol({ desc })
        await newRol.save()
        res.json(newRol);
    }
    catch (err) {
        if (err.name === 'MongoServerError' && err.code === 11000) {
            return res.status(409).json({
                message: 'Este cargo ya está creado'
            });
        }
        res.status(500).json({ message: "Error al crear el cargo: " + err })
    }
}

const updateRol = async (req, res) => {
    const { id } = req.params;
    const { desc } = req.body;

    try {
        const updatedRol = await Rol.findByIdAndUpdate(
            id, 
            { desc }, 
            { new: true }
        );
        
        if (!updatedRol) {
            return res.status(404).json({ message: "Rol no encontrado" });
        }
        res.json(updatedRol);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error al actualizar el rol" });
    }
}

module.exports = {
    getRols,
    createRol,
    updateRol
}