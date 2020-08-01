const Place = require('../models').Place;
const Trip = require('../models').Trip;
const Rating = require('../models').Rating;

module.exports = {
    create(req, res) {
        var point = req.body.coordinates ? {
                type: 'Point',
                coordinates: [
                    req.body.coordinates.latitude,
                    req.body.coordinates.longitude,
                ],
            } :
            null;
        return Place.create({
                tripId: req.params.tripId,
                name: req.body.name,
                googlePlaceId: req.body.googlePlaceId,
                coordinates: point,
                audioUrl: req.body.audioUrl,
                audioPreviewUrl: req.body.audioPreviewUrl,
                pictureUrl1: req.body.pictureUrl1,
                pictureUrl2: req.body.pictureUrl2,
                price: req.body.price,
                order: req.body.order,
                about: req.body.about,
            })
            .then((item) =>
                res.status(200).send({
                    success: true,
                    message: 'Place successfully created.',
                    item,
                })
            )
            .catch((error) => res.status(400).send(error));
    },

    delete(req, res) {
        return Place.destroy({ where: { id: req.params.id, tripId: req.params.tripId } }).then((item) => {
            if (item > 0)
                _success = true
            else
                _success = false

            res.status(200).send({
                success: _success,
                message: 'ok',
                item,
            });
        }).catch((error) => res.status(400).send(error));
    },

    update(req, res) {
        var point = req.body.coordinates ? {
                type: 'Point',
                coordinates: [
                    req.body.coordinates.latitude,
                    req.body.coordinates.longitude,
                ],
            } :
            null;
        return Place.update({
            name: req.body.name,
            googlePlaceId: req.body.googlePlaceId,
            coordinates: point,
            audioUrl: req.body.audioUrl,
            audioPreviewUrl: req.body.audioPreviewUrl,
            pictureUrl1: req.body.pictureUrl1,
            pictureUrl2: req.body.pictureUrl2,
            price: req.body.price,
            order: req.body.order,
            about: req.body.about,
        }, {
            where: { id: req.params.id, tripId: req.params.tripId }
        }).then((item) => {
            if (item > 0)
                Place.findOne({
                    where: { id: req.params.id },
                    include: { Rating },
                }).then((place) => {
                    res.status(200).send({
                        success: true,
                        message: 'ok',
                        place,
                    });
                });
            else
                res.status(200).send({
                    success: false,
                    message: 'No place updated',
                    item,
                })
        }).catch((error) => res.status(400).send(error));
    },

    getAll(_, res) {
        return Place.findAll({ include: [{ model: Trip }, { model: Rating }] })
            .then((places) => {
                res.status(200).send({
                    success: true,
                    message: 'ok',
                    places,
                });
            })
            .catch((error) => res.status(400).send(error));
    },

    getById(req, res) {
        return Place.findOne({
                where: { tripId: req.params.tripId, id: req.params.id },
                include: [{ model: Trip }, { model: Rating }],
            })
            .then((place) => {
                res.status(200).send({
                    success: true,
                    message: 'ok',
                    place,
                });
            })
            .catch((error) => res.status(400).send(error));
    },

    getByTripId(req, res) {
        return Place.findAll({ where: { tripId: req.params.tripId } })
            .then((places) => {
                res.status(200).send({
                    success: true,
                    message: 'ok',
                    places,
                });
            })
            .catch((error) => res.status(400).send(error));
    },
};