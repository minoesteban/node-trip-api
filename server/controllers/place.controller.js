const Place = require('../models').Place;
const Trip = require('../models').Trip;
const Rating = require('../models').Rating;

module.exports = {
    create(req, res) {
        return Place.create(req.body)
            .then((place) =>
                res.status(200).send({ place })
            )
            .catch((error) => res.status(400).send(error));
    },

    delete(req, res) {
        return Place.destroy({ where: { id: req.params.id, tripId: req.params.tripId } }).then((item) => {
            if (item > 0)
                res.status(200).send({ item });
            else
                res.status(400).send({ result: `no place found with id ${req.params.id}` });

        }).catch((error) => res.status(400).send(error));
    },

    update(req, res) {
        return Place.update(req.body, { where: { id: req.params.id, tripId: req.params.tripId } })
            .then((item) => {
                if (item > 0)
                    Place.findOne({
                        where: { id: req.params.id }
                    }).then((place) => {
                        res.status(200).send({ place });
                    });
                else
                    res.status(400).send({ result: `no place found with id ${req.params.id}` });
            }).catch((error) => res.status(400).send(error));
    },

    getAll(_, res) {
        return Place.findAll({ include: [{ model: Trip }, { model: Rating }] })
            .then((places) => {
                res.status(200).send({ places });
            })
            .catch((error) => res.status(400).send(error));
    },

    getById(req, res) {
        return Place.findOne({
                where: { tripId: req.params.tripId, id: req.params.id },
                include: [{ model: Trip }, { model: Rating }],
            })
            .then((place) => {
                res.status(200).send({ place });
            })
            .catch((error) => res.status(400).send(error));
    },

    getByTripId(req, res) {
        return Place.findAll({ where: { tripId: req.params.tripId } })
            .then((places) => {
                res.status(200).send({ places });
            })
            .catch((error) => res.status(400).send(error));
    },
};