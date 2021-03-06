const place = require('../controllers').place;
const validator = require('../validators/place.validator');
const router = require('express').Router();

router.post('/:tripId/places', place.create);

router.get('/places/all', place.getAll);

router.get('/:tripId/places/:id', validator.getById, place.getById);

router.patch('/:tripId/places/:id', validator.update, place.update);

router.delete('/:tripId/places/:id', validator.delete, place.delete);

router.get('/:tripId/places', validator.getByTripId, place.getByTripId);

router.put(
    '/:tripId/places/:id/files',
    validator.getSignedUrlPut,
    place.getSignedUrlPut
);

router.get(
    '/:tripId/places/:id/files',
    validator.getSignedUrlGet,
    place.getSignedUrlGet
);

module.exports = router;