import express from 'express';
import connection from '../config/database.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Middleware para autenticar al usuario
const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ error: "Acceso denegado. Token no proporcionado." });

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), "secreto");
        req.userId = decoded.id;
        next();
    } catch (error) {
        return res.status(403).json({ error: "Token inválido." });
    }
};

// Obtener los movimientos del usuario autenticado
router.get('/movements', authenticateUser, async (req, res) => {
    try {
        const [rows] = await connection.query('SELECT * FROM movimientos WHERE person_id = ? ORDER BY fecha DESC', [req.userId]);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Agregar un nuevo movimiento para el usuario autenticado
router.post('/movements', authenticateUser, async (req, res) => {
    try {
        const { descripcion, monto, tipo } = req.body;
        if (!descripcion || !monto || !tipo) {
            return res.status(400).json({ error: "Todos los campos son obligatorios." });
        }
        const fecha = new Date();
        const query = 'INSERT INTO movimientos (descripcion, monto, tipo, fecha, person_id) VALUES (?, ?, ?, ?, ?)';
        await connection.query(query, [descripcion, monto, tipo, fecha, req.userId]);
        res.status(201).json({ message: "Movimiento agregado correctamente." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar un movimiento del usuario autenticado
router.put('/movements/:id', authenticateUser, async (req, res) => {
    try {
        const { id } = req.params;
        const { descripcion, monto, tipo } = req.body;
        if (!descripcion || !monto || !tipo) {
            return res.status(400).json({ error: "Todos los campos son obligatorios." });
        }
        const [result] = await connection.query('UPDATE movimientos SET descripcion = ?, monto = ?, tipo = ? WHERE id = ? AND person_id  = ?', [descripcion, monto, tipo, id, req.userId]);
        if (result.affectedRows === 0) return res.status(404).json({ error: "Movimiento no encontrado o no autorizado." });
        res.json({ message: "Movimiento actualizado correctamente." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminar un movimiento del usuario autenticado
router.delete('/movements/:id', authenticateUser, async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await connection.query('DELETE FROM movimientos WHERE id = ? AND person_id  = ?', [id, req.userId]);
        if (result.affectedRows === 0) return res.status(404).json({ error: "Movimiento no encontrado o no autorizado." });
        res.json({ message: "Movimiento eliminado correctamente." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
