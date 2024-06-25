const { Router } = require('express');

const router = Router();

const reviewController = require('../controllers/review');

router.post('/', reviewController.createReview);
router.get('/:idBook', reviewController.getRewiews);


module.exports = router;