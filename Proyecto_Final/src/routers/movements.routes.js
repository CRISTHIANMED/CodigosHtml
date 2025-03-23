import express from 'express';
import connection from '../config/database.js';

const router = express.Router();

// Obtener todos los movimientos
router.get('/movements', async (req, res) => {
    try {
        const [rows] = await connection.query('SELECT * FROM movimientos ORDER BY fecha DESC');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/movements', async (req, res) => {
    try {
        const { descripcion, monto, tipo } = req.body;

        if (!descripcion || !monto || !tipo) {
            return res.status(400).json({ error: "Todos los campos son obligatorios." });
        }

        const fecha = new Date(); // Fecha actual
        const query = 'INSERT INTO movimientos (descripcion, monto, tipo, fecha) VALUES (?, ?, ?, ?)';
        await connection.query(query, [descripcion, monto, tipo, fecha]);

        res.status(201).json({ message: "Movimiento agregado correctamente." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/movements/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { descripcion, monto, tipo } = req.body;

        if (!descripcion || !monto || !tipo) {
            return res.status(400).json({ error: "Todos los campos son obligatorios." });
        }

        await connection.query(
            'UPDATE movimientos SET descripcion = ?, monto = ?, tipo = ? WHERE id = ?',
            [descripcion, monto, tipo, id]
        );

        res.json({ message: "Movimiento actualizado correctamente." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.delete('/movements/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await connection.query('DELETE FROM movimientos WHERE id = ?', [id]);
        res.json({ message: "Movimiento eliminado correctamente." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


export default router;