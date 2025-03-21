import {createPool} from 'mysql2/promise'

const connection = createPool({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'prueba1'
});

export default connection;

