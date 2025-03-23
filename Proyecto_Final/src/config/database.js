import { createPool} from 'mysql2/promise';

//Creamos un pool de conexion
const pool = createPool({
    host: 'localhost',
    port: 3306,
    connectionLimit: 10, // Cuantos clientes puede conectar al mismo tiempo
    user: 'root', //usuario por defecto de xampp
    password: '',
    database: 'finanzas'
});

//Probamos conexion de la bd
let connection;

try {
    connection = await pool.getConnection();
    console.log('Conectado a la base de datos!');
    connection.release(); // Liberamos la conexion para que otros puedan usarla
} catch (error) {
    console.log('Error conectandose a la base de datos: ' + error);
}

export default connection;