const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    Titulo: {
        type: String,
        required: true
    },
    Autor: {
        type: String,
        required: true
    },
    Descripcion: {
        type: String,
        required: true,
    },
    Genero: {
        type: String,
        required: true
    },
    Fecha_publicacion: {
        type: Date,
        required: true
    },
    Disponibilidad: {
        type: Boolean,
        required: true
    },
    Cantidad_stock: {
        type: Number,
        required: true
    },
    Puntuacion_promedio: {
        type: Number,
        required: true
    },
    Precio: {
        type: Number,
        required: true
    },
    Imagen_url: {
        type: String,
        required: true
    }
}, { collection: 'books' });


module.exports = mongoose.model('Book', bookSchema);
