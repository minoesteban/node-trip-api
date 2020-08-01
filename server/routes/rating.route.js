const rating = require('../controllers').rating;
const validator = require('../validators/rating.validator');
const router = require('express').Router();

router.post('/', rating.create);

router.get('/all', rating.getAll);

router.get('/', validator.getBy, rating.getBy);

router.patch('/:id', validator.update, rating.update);

module.exports = router;