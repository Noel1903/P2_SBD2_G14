const { Router } = require('express');

const router = Router();

const purchasesController = require('../controllers/purchases');

router.post('/', purchasesController.addPurchase);
router.get('/', purchasesController.getPurchases);
router.get('/:userId', purchasesController.getPurchasesByUser);
router.put('/', purchasesController.updatePurchase);

module.exports = router;