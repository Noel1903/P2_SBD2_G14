const { Router } = require('express');

const router = Router();

const autorController = require('../controllers/author');

router.post('/', autorController.createAuthor);
router.get('/', autorController.getAuthors);
router.get('/:id', autorController.getAuthor);
router.delete('/:id', autorController.deleteAuthor);



module.exports = router;