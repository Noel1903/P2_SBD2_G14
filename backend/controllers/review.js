const { response } = require('express');
const Review = require('../models/reviews');
const Book = require('../models/book');

const createReview = async(req, res = response) => {
    const { IdUser, IdBook, review, rating } = req.body;

    try {
        const newReview = new Review({
            IdUser,
            IdBook,
            review,
            rating
        });

        await newReview.save();
        const reviews = await Review.find({ IdBook });
        const totalRatings = reviews.reduce((acc, curr) => acc + curr.rating, 0);
        const averageRating = totalRatings / reviews.length;
        await Book.findByIdAndUpdate(IdBook, { puntuacion_promedio: averageRating });
        res.status(200).json({
            message: 'Reseña creada exitosamente',
            ok: true
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al crear reseña ' + error,
            ok: false
        });
    }
}

const getRewiews = async(req, res = response) => {
    const { id } = req.params;

    try {
        const reviews = await Review.find({ IdBook: id });

        res.status(200).json({
            reviews
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener reseñas ' + error
        });
    }
}


module.exports = {
    createReview,
    getRewiews
}
