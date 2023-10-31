const express = require('express');
const router = express.Router();
const upload = require('../libs/multer')
const Zapato = require('../models/zapato')

/* Para cuando se obtienen los datos directamente de mongodb a traves del Schema */
/* Obtenemos todos los datos directamente de la base de datos mongo */

router.get('/', async (req, res) => {
    try {
        const arrayZapatosDB = await Zapato.find();
        //console.log(arrayZapatosDB);
        res.render("zapatos", { arrayZapatos: arrayZapatosDB })
        //res.json(arrayZapatosDB)
    } catch (error) {
        console.log(error)

    }
});

router.get('/insertar', (req, res) => {
    res.render('insertar')
});


/* para insertar un elemento directamente en la base de datos de mongo */
router.post('/', async (req, res) => {
    const body = req.body;
    try {
        console.log(body)
        let params = {
            _id: body.id,
            marca: body.marca,
            color: [body.color],
            costo: { proveedor: body.costo },
            tamanio: [body.tamanio],
            tipo: [body.tipo],
            numeroZapato: body.numeroZapato,
            precio: body.precio,
            material: body.material
        }
        console.log(params)
        await Zapato.create(params);
    } catch (error) {
        console.log(error);
    }
});

/* Para buscar un solo elemento por medio del ID */
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const zapatoDB = await Zapato.findOne({ _id: id })

        res.render('findone', {
        zapato: zapatoDB,
        error: false
        })
    } catch (error) {
        console.log(error)
        res.render('findone', {
            error: true,
            mensaje: 'No se encuentra el zapato buscado intente nuevamente por favor'
        })
    }
});

/* Para eliminar un solo documento en la base de datos de Mongo */
router.delete('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const zapatoDB = await Zapato.findOneAndDelete({ _id: id })
        if (zapatoDB) {
            res.json({
                estado: true,
                mensaje: 'Zapato Eliminado'
            })
        } else {
            res.json({
                estado: false,
                mensaje: 'No se pudo eliminar el Zapato seleccionado'
            })

        }

    } catch (error) {
        console.log(error)
    }
})

router.put('/:id', async (req, res) => {
    const id = req.params.id
    const body = req.body
    try {
        console.log(body)
        const zapatoDB =await Zapato.findOneAndUpdate({ _id: id },body,{useFindAndModify:false});
        console.log(zapatoDB)
        res.json({
            estado:true,
            mensaje:'El Zapato ha sido editado'
        })
    } catch (error) {
        console.log(error)
        res.json({
            estado:false,
            mensaje:'El Zapato no fue eliminado'
        })
    }
});

module.exports = router;