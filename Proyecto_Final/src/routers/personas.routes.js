import express from 'express';
import connection from '../config/database.js';
import bcrypt from 'bcrypt'; // Para encriptar contraseñas
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Buscar el usuario en la base de datos
        const [user] = await connection.query("SELECT * FROM persona WHERE email = ?", [email]);
        if (user.length === 0) {
            return res.status(401).json({ message: "Usuario no encontrado." });
        }

        // Comparar contraseñas
        const validPassword = await bcrypt.compare(password, user[0].password);
        if (!validPassword) {
            return res.status(401).json({ message: "Contraseña incorrecta." });
        }

        // Generar token JWT
        const token = jwt.sign({ id: user[0].id, email: user[0].email }, "secreto", { expiresIn: "1h" });

        res.json({ message: "Login exitoso.", token });

    } catch (error) {
        console.error("Error en login:", error);
        res.status(500).json({ message: "Error en el servidor." });
    }
});


// Ruta para registrar un nuevo usuario
router.post('/register', async (req, res) => {
    const { nombre, apellido, email, password } = req.body;

    if (!nombre || !apellido || !email || !password) {
        return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    try {
        // Verificar si el usuario ya existe
        const [existingUser] = await connection.query("SELECT * FROM persona WHERE email = ?", [email]);

        if (existingUser.length > 0) {
            return res.status(400).json({ message: "El correo ya está registrado" });
        }

        // Encriptar la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertar el usuario en la base de datos
        const [result] = await connection.query(
            "INSERT INTO persona (nombre, apellido, email, password) VALUES (?, ?, ?, ?)",
            [nombre, apellido, email, hashedPassword]
        );

        res.status(201).json({ message: "Usuario registrado correctamente" });

    } catch (error) {
        console.error("Error registrando usuario:", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
});




export default router;