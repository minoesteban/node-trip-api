const trip = require('../controllers').trip;
const validator = require('../validators/trip.validator');
const router = require('express').Router();

router.post('/', trip.create);

router.get('/all', trip.getAll);

router.get('/:id', validator.getById, trip.getById);

router.patch('/:id', validator.update, trip.update);

router.put('/:id/files', validator.getSignedUrlPut, trip.getSignedUrlPut);

router.get('/:id/files', validator.getSignedUrlGet, trip.getSignedUrlGet);

router.delete('/:id', validator.delete, trip.delete);

module.exports = router;