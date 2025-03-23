import express from 'express';
import connection from '../config/database.js';
import jwt from 'jsonwebtoken';

//Creación del enrutador de Express
const router = express.Router();

// Middleware para autenticar al usuario
const authenticateUser = (req, res, next) => {
    // Obtiene el token del encabezado de la solicitud
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ error: "Acceso denegado. Token no proporcionado." });

    try {
        // Verifica el token y extrae el ID del usuario
        const decoded = jwt.verify(token.replace('Bearer ', ''), "secreto");
        // Almacena el ID del usuario en la solicitud para su uso posterior
        req.userId = decoded.id;
        next();
    } catch (error) {
        // Responde con un error si el token no es válido
        return res.status(403).json({ error: "Token inválido." });
    }
};

// Ruta para obtener los movimientos del usuario autenticado
router.get('/movements', authenticateUser, async (req, res) => {
    try {
        // Consulta todos los movimientos del usuario autenticado, ordenados por fecha descendente
        const [rows] = await connection.query('SELECT * FROM movimientos WHERE person_id = ? ORDER BY fecha DESC', [req.userId]);
        // Devuelve los movimientos en formato JSON
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Ruta para agregar un nuevo movimiento del usuario autenticado
router.post('/movements', authenticateUser, async (req, res) => {
    try {
        // Extrae los datos del cuerpo de la solicitud
        const { descripcion, monto, tipo } = req.body;

        // Verifica que todos los campos sean proporcionados
        if (!descripcion || !monto || !tipo) {
            return res.status(400).json({ error: "Todos los campos son obligatorios." });
        }

        // Obtiene la fecha actual
        const fecha = new Date();
        const query = 'INSERT INTO movimientos (descripcion, monto, tipo, fecha, person_id) VALUES (?, ?, ?, ?, ?)';
        
        // Inserta el nuevo movimiento en la base de datos
        await connection.query(query, [descripcion, monto, tipo, fecha, req.userId]);

        // Responde con un mensaje de éxito
        res.status(201).json({
             message: "Movimiento agregado correctamente." 
            });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Ruta para actualizar un movimiento del usuario autenticado
router.put('/movements/:id', authenticateUser, async (req, res) => {
    try {

        // Obtiene el ID del movimiento desde los parámetros de la URL
        const { id } = req.params;

        // Obtiene los datos del cuerpo de la solicitud
        const { descripcion, monto, tipo } = req.body;

        // Verifica que todos los campos sean proporcionados
        if (!descripcion || !monto || !tipo) {
            return res.status(400).json({ error: "Todos los campos son obligatorios." });
        }

        // Ejecuta la consulta para actualizar el movimiento
        const [result] = await connection.query('UPDATE movimientos SET descripcion = ?, monto = ?, tipo = ? WHERE id = ? AND person_id  = ?', [descripcion, monto, tipo, id, req.userId]);
        
        // Si no se actualizó ninguna fila, significa que el movimiento no existe o no pertenece al usuario
        if (result.affectedRows === 0) return res.status(404).json({ error: "Movimiento no encontrado o no autorizado." });
        res.json({ message: "Movimiento actualizado correctamente." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Ruta para eliminar un movimiento del usuario autenticado
router.delete('/movements/:id', authenticateUser, async (req, res) => {
    try {
        // Obtiene el ID del movimiento desde los parámetros de la URL
        const { id } = req.params;

        // Ejecuta la consulta para eliminar el movimiento
        const [result] = await connection.query('DELETE FROM movimientos WHERE id = ? AND person_id  = ?', [id, req.userId]);
        
        // Si no se eliminó ninguna fila, significa que el movimiento no existe o no pertenece al usuario
        if (result.affectedRows === 0) return res.status(404).json({ error: "Movimiento no encontrado o no autorizado." });
        res.json({ message: "Movimiento eliminado correctamente." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Exporta el enrutador para que pueda ser utilizado en la aplicación principal
export default router;
