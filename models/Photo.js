const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const photoSchema = new Schema({
    title: String,
    description: String,
    imagePath:String
});

/* Creamos el modelo */
const Photo = mongoose.model('Photo',photoSchema);

module.exports = Photo;
