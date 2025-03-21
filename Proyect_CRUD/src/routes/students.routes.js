import { Router } from "express";
import connection from "../database.js";

const router = Router();

router.get('/list', async (req, res) => {
    try {
        const[result]  = await connection.query('select * from estudiantes');
        console.log('Tabla', result);
        //res.render('students/list', {students: result})
    } catch (error) {
        res.status(500).join({ message: error.message })
    }
})

export default router;