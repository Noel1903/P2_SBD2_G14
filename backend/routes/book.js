const { Router } = require('express');

const router = Router();


const bookController = require('../controllers/book');

router.post('/', bookController.createBook);
router.get('/', bookController.getBooks);
router.get('/:id', bookController.getBookById);
router.delete('/:id', bookController.deleteBook);

module.exports = router;