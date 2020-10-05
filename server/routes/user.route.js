const user = require('../controllers').user;
const validator = require('../validators/user.validator');
const router = require('express').Router();

router.post('/signup', user.create);

router.get('/login', user.validUser);

router.put('/:id/files', validator.getSignedUrlPut, user.getSignedUrlPut);

router.get('/:id', validator.getById, user.getById);

router.patch('/:id', validator.update, user.update);

module.exports = router;