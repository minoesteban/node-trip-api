const user = require('../controllers').user;
const validator = require('../validators/user.validator');
const router = require('express').Router();

router.post('/signup', validator.create, user.create);

router.post('/login', validator.login, user.login);

router.put('/activate', validator.activate, user.activate);

router.put('/:id/files', validator.getSignedUrlPut, user.getSignedUrlPut);

router.get('/:id', validator.getById, user.getById);

router.get('/s3/file', user.getFile);

router.patch('/:id', validator.update, user.update);

module.exports = router;