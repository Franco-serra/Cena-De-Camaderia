require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(cors({
    origin: "https://cena-de-camaraderia-front.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));


const authRoutes = require("./routes/auth.routes");
const adminRoutes = require("./routes/admin.routes");

const confirmacionRoutes = require("./routes/confirmacion.routes");

app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/confirmaciones", confirmacionRoutes);

if (!process.env.MONGO_URI) {
    console.error("❌ Falta MONGODB_URI en el .env");
    process.exit(1);
}

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("✅ Conectado a MongoDB");
        app.listen(PORT, () => {
            console.log("Servidor corriendo en puerto " + PORT);
        });
    })
    .catch((error) => {
        console.error("❌ Error conectando a MongoDB:", error);
    });