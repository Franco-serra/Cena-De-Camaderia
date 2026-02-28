const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    obtenerConfirmados,
    crearConfirmacion,
    buscarConfirmaciones,
    eliminarConfirmacion
} = require("../controllers/confirmaciones-controller");


router.post("/", crearConfirmacion);

router.get("/", authMiddleware, buscarConfirmaciones);

router.get("/", authMiddleware, obtenerConfirmados);

router.delete("/:id", authMiddleware, eliminarConfirmacion);

module.exports = router;