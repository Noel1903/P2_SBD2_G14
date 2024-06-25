const { Router } = require('express');
const { signUp, getProfile, updateProfile } = require('../controllers/user')
const router = Router();

router.post('/', signUp);
router.get('/profile/:id', getProfile);
router.put('/profile', updateProfile);

module.exports = router;