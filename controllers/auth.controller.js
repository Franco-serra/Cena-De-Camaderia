const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            const error = new Error("Email y password son obligatorios");
            error.status = 400;
            throw error;
        }

        const existeAdmin = await Admin.findOne({ email });
        if (existeAdmin) {
            const error = new Error("El admin ya existe");
            error.status = 400;
            throw error;
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const nuevoAdmin = new Admin({
            email,
            password: passwordHash
        });

        await nuevoAdmin.save();

        res.status(201).json({
            mensaje: "Admin registrado correctamente"
        });

    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });
        if (!admin) {
            const error = new Error("Credenciales inválidas");
            error.status = 401;
            throw error;
        }

        const passwordValida = await bcrypt.compare(password, admin.password);

        if (!passwordValida) {
            const error = new Error("Credenciales inválidas");
            error.status = 401;
            throw error;
        }

        const token = jwt.sign(
            { id: admin._id },
            process.env.JWT_SECRET,
            { expiresIn: "2h" }
        );

        res.json({ token });

    } catch (error) {
        next(error);
    }
};

module.exports = { login, register };