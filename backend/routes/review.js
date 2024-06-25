const { Router } = require('express');

const router = Router();

const reviewController = require('../controllers/review');

router.post('/', reviewController.addReview);
router.get('/:idBook', reviewController.getRewiews);