import express from 'express';
import connection from '../config/database.js';

const router = express.Router();

router.get('/', async (request, response) => {
    const query = "Select id, nombre, apellido, email, telefono, identificacion from personas"
    try { 
        const [result] = await connection.query(query);
        response.json(result);
    } catch (error) {
        console.error("Error obteniendo personas ", error);
    }
});

router.post('/agregarpersona', async (request, response) => {
    try {
        const datos = request.body;
        const newPersona={
            identificacion: datos.identification,
            nombre: datos.firstName,
            apellido: datos.lastName,
            email: datos.email,
            telefono: datos.phone
        }
        await connection.query("Insert into personas SET ?", [newPersona]);
        response.status(201).json({message: "Persona agregada correctamente"});
    }catch (error) {
        console.error("Error agregando persona ", error);
        response.status(400).json({message: "Error al agregar persona"});
    }
});

router.put('/actualizarpersona/:id', async (request, response) => {
    try {
        const datos = request.body;
        const id = request.params.id;
        const modifiedPerson={
            identificacion: datos.identification,
            nombre: datos.firstName,
            apellido: datos.lastName,
            email: datos.email,
            telefono: datos.phone
        };
        await connection.query("UPDATE personas SET ? WHERE ID = ?", [modifiedPerson, id]);
        response.status(200).json({message: "Persona actualizada correctamente"});        
    } catch (error) {
        console.error("Error actualizando persona ", error); 
        response.status(400).json({message: "Error actualizando persona"});
    }
});

router.delete('/eliminarpersona/:id', async (request, response) => {
    try{
        const id = request.params.id;
        await connection.query("DELETE FROM personas WHERE ID =?", [id]);
        response.status(200).json({message: "Persona eliminada correctamente"});
    }catch (error) {
        console.error("Error eliminando persona ", error);
        response.status(400).json({message: "Error al eliminar persona"});
    }
});

export default router;