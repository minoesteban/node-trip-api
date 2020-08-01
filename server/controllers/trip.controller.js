const Trip = require('../models').Trip;
const Place = require('../models').Place;
const Rating = require('../models').Rating;

module.exports = {
    create(req, res) {
        return Trip.create(
                req.body
                // {
                //     name: req.body.name,
                //     ownerId: req.body.ownerId,
                //     googlePlaceId: req.body.googlePlaceId,
                //     countryId: req.body.countryId,
                //     previewAudioUrl: req.body.previewAudioUrl,
                //     languageNameId: req.body.languageNameId,
                //     languageFlagId: req.body.languageFlagId,
                //     price: req.body.price,
                //     about: req.body.about,
                //     pictureUrl: req.body.pictureUrl,
                // }
                , { include: Place })
            .then((item) =>
                res.status(200).send({
                    success: true,
                    message: 'Trip successfully created.',
                    item,
                })
            )
            .catch((error) => res.status(400).send(error));
    },

    delete(req, res) {
        return Trip.destroy({ where: { id: req.params.id } }).then((item) => {
            if (item > 0)
                _success = true
            else
                _success = false

            _sendSuccess(res, {
                success: _success,
                message: 'ok',
                item,
            });
        }).catch((error) => _sendError(res, error));
    },

    update(req, res) {
        return Trip.update(
            req.body
            //     {
            //     name: req.body.name,
            //     ownerId: req.body.ownerId,
            //     googlePlaceId: req.body.googlePlaceId,
            //     countryId: req.body.countryId,
            //     previewAudioUrl: req.body.previewAudioUrl,
            //     languageNameId: req.body.languageNameId,
            //     languageFlagId: req.body.languageFlagId,
            //     price: req.body.price,
            //     about: req.body.about,
            //     pictureUrl: req.body.pictureUrl,
            //     submitted: req.body.submitted,
            //     published: req.body.published,
            // }
            , {
                where: { id: req.params.id }
            }).then((item) => {
            if (item > 0)
                Trip.findOne({
                    where: { id: req.params.id },
                    include: { model: Place, include: Rating },
                }).then((trip) => {
                    res.status(200).send({
                        success: true,
                        message: 'ok',
                        trip,
                    });
                });
            else
                res.status(200).send({
                    success: false,
                    message: 'No place updated',
                    item,
                });
        }).catch((error) => res.status(400).send(error));
    },

    getAll(_, res) {
        return Trip.findAll({ include: { model: Place, include: Rating } })
            .then((trips) => {
                res.status(200).send({
                    success: true,
                    message: 'ok',
                    trips,
                });
            })
            .catch((error) => res.status(400).send(error));
    },

    getById(req, res) {
        return Trip.findOne({
                where: { id: req.params.id },
                include: { model: Place, include: Rating },
            })
            .then((trip) => {
                res.status(200).send({
                    success: true,
                    message: 'ok',
                    trip,
                });
            })
            .catch((error) => res.status(400).send(error));
    },

    getByOwnerId(req, res) {
        return Trip.findAll({
                where: { ownerId: req.params.ownerId },
                include: { model: Place, include: Rating },
            })
            .then((trips) => {
                res.status(200).send({
                    success: true,
                    message: 'ok',
                    trips,
                });
            })
            .catch((error) => res.status(400).send(error));
    },
};