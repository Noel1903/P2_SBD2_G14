const { Router } = require('express');

const router = Router();

const cartController = require('../controllers/cart');

router.post('/', cartController.addCart);
router.get('/:userId', cartController.getCart);
router.delete('/:idCart', cartController.deleteCart);

module.exports = router;