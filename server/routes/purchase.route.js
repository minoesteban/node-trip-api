const purchase = require('../controllers').purchase;
const validator = require('../validators/purchase.validator');
const router = require('express').Router();

router.post('/', purchase.create);

router.get('/all', purchase.getAll);

router.get('/', validator.getBy, purchase.getBy);

router.patch('/:id', validator.update, purchase.update);

module.exports = router;