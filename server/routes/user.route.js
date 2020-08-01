const user = require('../controllers').user;
const validator = require('../validators/user.validator');
const router = require('express').Router();

router.post('/', user.create);

router.get('/', user.getByUsername);

router.get('/all', user.getAll);

router.get('/:id', validator.getById, user.getById);

router.patch('/:id', validator.update, user.update);

module.exports = router;