const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const zapatoSchema = Schema({
    _id: Number,
    marca: String,
    color: [],
    costo: {},
    tamanio: [],
    tipo: [],
    numeroZapato: Number,
    precio: Number,
    material: String,
});

/* Creamos el modelo */
const Zapato = mongoose.model('Zapato',zapatoSchema);

module.exports = Zapato;