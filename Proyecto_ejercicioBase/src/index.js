import express from 'express';
import personasRouter from './routers/personas.routes.js'
import cors from 'cors';

const app = express();

app.use(cors({
    origin: ["http://localhost:5500", "http://127.0.0.1:5500"]
}));

app.use(express.json());
app.use(personasRouter);

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
    console.log(`Server is running on port ${app.get('port')}`);
})