const place = require('../controllers').place;
const validator = require('../validators/place.validator');
const router = require('express').Router();

router.post('/:tripId/place', place.create);

router.get('/place/all', place.getAll);

router.get('/:tripId/place/:id', validator.getById, place.getById);

router.patch('/:tripId/place/:id', validator.update, place.update);

router.delete('/:tripId/place/:id', validator.delete, place.delete);

router.get('/:tripId/place', validator.getByTripId, place.getByTripId);

module.exports = router;