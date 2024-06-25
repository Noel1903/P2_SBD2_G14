const { Router } = require('express');
const { signUp } = require('../controllers/user')
const router = Router();

router.post('/', signUp);

module.exports = router;