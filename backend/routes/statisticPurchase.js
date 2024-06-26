const { Router } = require('express');
const { getTopBook } = require('../controllers/statisticPurchase');

const router = Router();

router.get('/', getTopBook)

module.exports = router;