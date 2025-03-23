import express from 'express';
import cors from 'cors';
import personasRouter from './routers/personas.routes.js';
import movementsRoutes from './routers/movements.routes.js';

// Creación de la aplicación Express
const app = express();

// Configuración de CORS
app.use(cors({
    origin: ["http://localhost:5500", "http://127.0.0.1:5500"]
}));

// Para permitir el uso de JSON en las solicitudes
app.use(express.json());

// Agregar las rutas importadas a la aplicación
app.use(personasRouter);
app.use(movementsRoutes);

//Configuración del puerto en el que se ejecutará el servidor
app.set('port', process.env.PORT || 3000);

//// Inicio del servidor
app.listen(app.get('port'), () => {
    console.log(`Server is running on port ${app.get('port')}`);
});