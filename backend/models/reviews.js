const { Schema, model } = require('mongoose');

const ReviewSchema = Schema({
    IdUser: {
        type:String,
        required: [true, 'El Id del usuario es obligatorio']
    },
    IdBook: {
        type:String,
        required: [true, 'El Id del libro es obligatorio']
    },
    review: {
        type: String,
        required: [true, 'La reseña es obligatoria']
    },
    rating: {
        type: Number,
        required: [true, 'La calificación es obligatoria']
    }
}, { collection: 'reviews' });

module.exports = model('Review', ReviewSchema);
