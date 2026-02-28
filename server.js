require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

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
        app.listen(process.env.PORT || 3000, () => {
            console.log("🚀 Servidor corriendo en puerto " + (process.env.PORT || 3000));
        });
    })
    .catch((error) => {
        console.error("❌ Error conectando a MongoDB:", error);
    });