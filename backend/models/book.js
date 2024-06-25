const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    Titulo: {
        type: String,
        required: true
    },
    autor: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true,
    },
    genero: {
        type: String,
        required: true
    },
    fecha_publicacion: {
        type: Date,
        required: true
    },
    disponibilidad: {
        type: Boolean,
        required: true
    },
    cantidad_stock: {
        type: Number,
        required: true
    },
    puntuacion_promedio: {
        type: Number,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    imagen_url: {
        type: String,
        required: true
    }
}, { collection: 'books' });


module.exports = mongoose.model('Book', bookSchema);
