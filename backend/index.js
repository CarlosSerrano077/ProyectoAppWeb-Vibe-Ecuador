const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const admin = require("./firebase");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.post("/api/register", async (req, res) => {
    try {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
        return res.status(400).json({
        message: "Todos los campos son obligatorios",
        });
    }

    const userRecord = await admin.auth().createUser({
        email,
        password,
        displayName: nombre,
    });

    res.status(201).json({
        message: "Usuario registrado correctamente",
        uid: userRecord.uid,
        email: userRecord.email,
        nombre: userRecord.displayName,
    });
    } catch (error) {
    res.status(400).json({
        message: "Error al registrar usuario",
        error: error.message,
    });
    }
});

app.post("/api/login", async (req, res) => {
    try {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
        message: "Correo y contraseña son obligatorios",
        });
    }

    const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_WEB_API_KEY}`,
        {
        email,
        password,
        returnSecureToken: true,
        }
    );

    res.json({
        message: "Inicio de sesión correcto",
        token: response.data.idToken,
        email: response.data.email,
        uid: response.data.localId,
    });
    } catch (error) {
    res.status(401).json({
        message: "Correo o contraseña incorrectos",
        error: error.response?.data?.error?.message || error.message,
    });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});