import { Router } from "express";
import conexion from '../database.js'

const router =Router();


router.get('/listar', async(req, res)=>{
    try{
        const [result] = await conexion.query('SELECT * FROM estudiantes');
        res.render('estudiantes/listar', {estudiantes: result});
        
    }
    catch(err){
        res.status(500).json({message:err.message});
        
    }
});

export default router;