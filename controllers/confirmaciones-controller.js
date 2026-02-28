
const Confirmados = require('../models/Confirmacion')

const obtenerConfirmados = async (req, res) => {
    try {
        const obtenerUsuarios = await Confirmados.find()
        res.status(200).json(obtenerUsuarios)
    } catch (error) {
        res.status(500).json({ mensaje: "Error del servidor" });
    }
}

const buscarConfirmaciones = async (req, res) => {
    try {

        const apellido = req.query.apellido || "";

        const confirmaciones = await Confirmados.find({
            apellido: { $regex: apellido, $options: "i" }
        });

        res.json(confirmaciones);

    } catch (error) {
        res.status(500).json({ mensaje: "Error del servidor" });
    }
};

const crearConfirmacion = async (req, res) => {
    try {
        const {
            nombre,
            apellido,
            llevaAcompanantes,
            cantidadAcompanantes
        } = req.body;

        if (!nombre || !apellido) {
            return res.status(400).json({
                mensaje: "Nombre y apellido son obligatorios"
            });
        }

        if (!nombre.trim() || nombre.trim().length < 2) {
            return res.status(400).json({
                mensaje: "El nombre debe tener al menos 2 caracteres"
            });
        }

        if (!apellido.trim() || apellido.trim().length < 2) {
            return res.status(400).json({
                mensaje: "El apellido debe tener al menos 2 caracteres"
            });
        }

        const nuevaConfirmacion = new Confirmados({
            nombre: nombre.trim(),
            apellido: apellido.trim(),
            llevaAcompanantes: llevaAcompanantes || false,
            cantidadAcompanantes: llevaAcompanantes
                ? cantidadAcompanantes || 0
                : 0
        });

        if (llevaAcompanantes && (!cantidadAcompanantes || cantidadAcompanantes < 1)) {
            return res.status(400).json({
                mensaje: "Debes indicar cuántos acompañantes lleva"
            });
        }

        if (!llevaAcompanantes && cantidadAcompanantes > 0) {
            return res.status(400).json({
                mensaje: "Cantidad inválida de acompañantes"
            });
        }

        await nuevaConfirmacion.save();

        return res.status(201).json(nuevaConfirmacion);

    } catch (error) {
        console.error("🔥 ERROR REAL:", error);
        return res.status(500).json({
            mensaje: "Error del servidor"
        });
    }
};

const eliminarConfirmacion = async (req, res) => {
    try {

        await Confirmados.findByIdAndDelete(req.params.id);

        res.json({ mensaje: "Eliminado correctamente" });

    } catch (error) {
        res.status(500).json({ mensaje: "Error del servidor" });
    }
};

module.exports = {
    obtenerConfirmados,
    crearConfirmacion,
    buscarConfirmaciones,
    eliminarConfirmacion
};