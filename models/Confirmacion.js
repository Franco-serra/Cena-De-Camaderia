const mongoose = require("mongoose");

const confirmacionSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    apellido: {
        type: String,
        required: true,
        trim: true
    },
    fechaRegistro: {
        type: Date,
        default: Date.now
    },
    llevaAcompanantes: {
        type: Boolean,
        default: false
    },
    cantidadAcompanantes: {
        type: Number,
        default: 0
    }
}, { timestamps: true });


module.exports = mongoose.model("Confirmacion", confirmacionSchema);