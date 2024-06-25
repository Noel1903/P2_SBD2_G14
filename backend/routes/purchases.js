const { Router } = require('express');

const router = Router();

const purchasesController = require('../controllers/purchases');

router.post('/', purchasesController.addPurchase);
router.get('/', purchasesController.getPurchases);
router.put('/', purchasesController.updatePurchase);

module.exports = router;