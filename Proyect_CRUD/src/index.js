import express from 'express'
import { engine } from 'express-handlebars';
import{join,dirname} from 'path';
import { fileURLToPath } from 'url';
import morgan from 'morgan';
import estudiantesRoutes from './routes/estudiante.routes.js'

//inicializar
const app=express(); 
const __dirname= dirname(fileURLToPath(import.meta.url))


//configuracion
app.set('port',process.env.PORT || 3000) //crea la asigancion del puerto en port

//configuracion plantilla
app.set("views", join(__dirname,'views')) //definiendo la ruta de los archivos de la plantilla

app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: join(app.get('views'), 'layouts'),
    partialsDir:join(app.get('views'), 'partials'),
    extname:'.hbs'
}));
app.set('view engine','.hbs')


//configuracion de middelwares
app.use(morgan('dev')); //ver todas las peticiones http que llegan desde nuestro servidor 
app.use(express.urlencoded({extended:false}))//interfas de formualrios
app.use(express.json()) // para archivos de tipo JSON


//routes
app.get('/',(req, res)=>{
    res.render('index')
})

app.use(estudiantesRoutes);

//Archivos publicos Public files
app.use(express.static(join(__dirname,'public')))//Establece la ruta de los archivos pubicos

//Run server


app.listen(app.get('port'), ()=>
    console.log('servidor escuchando por el puerto', app.get('port')));