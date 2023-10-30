const express = require('express');
const router = express.Router();
const Libro = require('../models/libro')
const upload = require('../libs/multer')

/* Para cuando se obtienen los datos directamente de mongodb a traves del Schema */
/* Obtenemos todos los datos directamente de la base de datos mongo */
router.get('/', async (req, res) => {
    try {
        const arrayLibrosDB = await Libro.find();
        // console.log(arrayLibrosDB);
        // res.render("libros", { arrayLibros: arrayLibrosDB })
        res.json(arrayLibrosDB)
    } catch (error) {
        console.log(error)

    }
});

/* Para cuando se mandan los arreglos de forma estática 
router.get('/', (req, res)=>{
    res.render("libros",{
        arrayLibros:[
            {isbn:1, titulo:'El principito', autor:'Antoine de Saint-Exupéry',anio:1943,editorial:'Tomo Books Mx'},
            {isbn:2, titulo:'Algebra de Baldor', autor:'Aurelio Baldor',anio:2010,editorial:'AlfaOmega'}

        ]
    })
}); */

router.get('/insertar', (req, res) => {
    res.render('insertar')
});


/* para insertar un elemento directamente en la base de datos de mongo */
router.post('/', async (req, res) => {
    const body = req.body;
    /* console.log(body); */
    try {
        /* primera forma de insercion en la base de datos */
        /* const libroDB = new Libro(body)
        await libroDB.save()
        console.log('Datos del libro nuevo insertado '+libroDB) */

        /* segunda forma de insercion de datos en mongo */
        await Libro.create(body);
        /* Redireccionamos a donde se listan los libros */
        // res.redirect('/libros');
    } catch (error) {
        console.log(error);
    }
});

/* Para buscar un solo elemento por medio del ISBN */
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        /* const libroDB = await Libro.findOne({ _id: id }) */
        const libroDB = await Libro.findOne({ isbn: id })

        // console.log(libroDB)
        res.json(libroDB)
        // res.render('findone', {
        //     libro: libroDB,
        //     error: false
        // })
    } catch (error) {
        console.log(error)
        res.render('findone', {
            error: true,
            mensaje: 'No se encuentra el libro buscado intente nuevamente por favor'
        })
    }
});

/* Para eliminar un solo documento en la base de datos de Mongo */
router.delete('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const libroDB = await Libro.findOneAndDelete({ isbn: id })
        /*para cuando hacemos eliminación por _id 
        const libroDB = await Libro.findByIdAndDelete({ _id: id }) */
        if (libroDB) {
            res.json({
                estado: true,
                mensaje: 'Libro Eliminado'
            })
        } else {
            res.json({
                estado: false,
                mensaje: 'No se pudo eliminar el libro seleccionado'
            })

        }

    } catch (error) {
        console.log(error)
    }
})
/* Para actualizar los datos de un solo libro */
router.put('/:id', async (req, res) => {
    const id = req.params.id
    const body = req.body
    try {
        const libroDB =await Libro.findOneAndUpdate({ isbn: id },body,{useFindAndModify:false});
        console.log(libroDB)
        res.json({
            estado:true,
            mensaje:'El libro ha sido editado'
        })
    } catch (error) {
        console.log(error)
        res.json({
            estado:false,
            mensaje:'El libro no fue eliminado'
        })
    }
});

module.exports = router;