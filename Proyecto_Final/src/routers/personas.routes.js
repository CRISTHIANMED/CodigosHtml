import express from 'express';
import connection from '../config/database.js';
import bcrypt from 'bcrypt'; // Para encriptar contraseñas
import jwt from "jsonwebtoken";

//Creación del enrutador de Express
const router = express.Router();

// Ruta para iniciar sesión (Login)
router.post("/login", async (req, res) => {

    // Obtener el email y la contraseña del cuerpo de la solicitud
    const { email, password } = req.body;

    try {
        // Buscar el usuario en la base de datos por su email
        const [user] = await connection.query("SELECT * FROM persona WHERE email = ?", [email]);
        
        // Si el usuario no existe, enviar un error de autenticación
        if (user.length === 0) {
            return res.status(401).json({ message: "Usuario no encontrado." });
        }

        // Comparar la contraseña ingresada con la contraseña almacenada (encriptada)
        const validPassword = await bcrypt.compare(password, user[0].password);
        if (!validPassword) {
            return res.status(401).json({ message: "Contraseña incorrecta." });
        }

        // Generar un token JWT para la sesión del usuario
        const token = jwt.sign(
            { id: user[0].id, email: user[0].email }, // Datos que se incluirán en el token
             "secreto",  // Clave secreta para firmar el token (debería estar en variables de entorno)
             { expiresIn: "1h" } // Duración del token (1 hora)
            ); 
        
        // Enviar respuesta con el token y los datos del usuario
        res.json({ 
            message: "Login exitoso.", 
            token,
            userId: user[0].id, 
            user: {nombre: user[0].nombre, apellido: user[0].apellido, email: user[0].email }
        });

    } catch (error) {
        console.error("Error en login:", error);
        res.status(500).json({ message: "Error en el servidor." });
    }
});


// Ruta para registrar un nuevo usuario
router.post('/register', async (req, res) => {

    // Obtener los datos del cuerpo de la solicitud
    const { nombre, apellido, email, password } = req.body;

    // Verificar si todos los campos obligatorios fueron proporcionados
    if (!nombre || !apellido || !email || !password) {
        return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    try {
        // Verificar si el usuario ya existe en la base de datos
        const [existingUser] = await connection.query("SELECT * FROM persona WHERE email = ?", [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: "El correo ya está registrado" });
        }

        // Encriptar la contraseña antes de guardarla en la base de datos
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertar el nuevo usuario en la base de datos
        const [result] = await connection.query(
            "INSERT INTO persona (nombre, apellido, email, password) VALUES (?, ?, ?, ?)",
            [nombre, apellido, email, hashedPassword]
        );

        // Enviar una respuesta indicando que el usuario fue registrado correctamente
        res.status(201).json({ 
            message: "Usuario registrado correctamente" 
        });

    } catch (error) {
        console.error("Error registrando usuario:", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
});

// Exporta el enrutador para que pueda ser utilizado en la aplicación principal
export default router;