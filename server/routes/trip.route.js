const trip = require('../controllers').trip;
const validator = require('../validators/trip.validator');
const router = require('express').Router();

router.post('/', trip.create);

router.get('/all', trip.getAll);

router.get('/:id', validator.getById, trip.getById);

router.get('/owner/:ownerId', validator.getByOwnerId, trip.getByOwnerId);

router.patch('/:id', validator.update, trip.update);

router.delete('/:id', validator.delete, trip.delete);

module.exports = router;