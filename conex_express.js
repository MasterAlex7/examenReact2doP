const express = require('express');
const { dirname } = require('path');
const app = express();
const bodyParser = require('body-parser');
const port = 3000

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

/* Conexion a la base de datos con mongo y mongoose */
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/biblio',
{useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>console.log('Base de datos conectada correctamente'))
    .catch(e=>console.log(e));

/* motor de plantillas plantillas de ejs*/
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + "/public"));

//Rutas web
app.use('/', require('./router/rutasweb'));
app.use('/libros', require('./router/Libros'));


//estas estaban al inicio antes de cambiarlas a rutasweb
/* app.get('/', (req, res) => {
    console.log("La ruta es "+__dirname);
    res.send('Respuesta dada desde un servidor con express ahora mismo');
    res.json({respuesta:"Estoy enviando un servicio a traves de json"})
    res.render("index", { titulo: "Enviando datos con EJS y Node" });
});

app.get('/servicios', (req, res) => {
    res.render("servicios", { tituloservicios: "Estas en la pagina de servicios" });
}); */

app.use((req, res, next) => {
    /* res.status(404).sendFile(__dirname + "/public/404.html"); */
    res.status(404).render("404", {
        titulo: "Error 404 no se puede encontrar la pagina",
        descripcion: "El recurso que usted requiere no se puede encontrar"
    });
});

app.listen(port, () => {
    console.log('El servidor esta escuchando en el puerto', port);
});