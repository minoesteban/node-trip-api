const { sequelize } = require('../models');
const { Op } = require('sequelize');
const Purchase = require('../models').Purchase;
const Trip = require('../models').Trip;
const Place = require('../models').Place;

module.exports = {
    create(req, res) {
        return Purchase.create({
                tripId: req.body.tripId,
                userId: req.body.userId,
                placeId: req.body.placeId,
            })
            .then((purchase) => res.status(200).send({ purchase }))
            .catch((error) => res.status(400).send(error));
    },

    getCount(_, res) {
        return Purchase.findAll({
                attributes: [
                    'tripId', [sequelize.fn('count', sequelize.col('id')), 'count'],
                ],
                group: 'trip_id',
                order: ['tripId'],
                where: {
                    tripId: {
                        [Op.gt]: 0,
                    },
                },
            })
            .then((trips) => {
                Purchase.findAll({
                        attributes: [
                            'placeId', [sequelize.fn('count', sequelize.col('id')), 'count'],
                        ],
                        group: 'place_id',
                        order: ['placeId'],
                        where: {
                            placeId: {
                                [Op.gt]: 0,
                            },
                        },
                    })
                    .then((places) => {
                        res.status(200).send({ trips, places });
                    })
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    getAll(_, res) {
        return Purchase.findAll()
            .then((purchases) => {
                res.status(200).send({ purchases });
            })
            .catch((error) => res.status(400).send(error));
    },

    getBy(req, res) {
        var filters = { tripId: null, placeId: null, userId: null };
        filters.tripId = req.query.tripId ?
            Number.parseInt(req.query.tripId) :
            null;
        filters.placeId = req.query.placeId ?
            Number.parseInt(req.query.placeId) :
            null;
        filters.userId = req.query.userId ?
            Number.parseInt(req.query.userId) :
            null;

        return Purchase.findAll({ where: filters })
            .then((purchases) => {
                res.status(200).send({ purchases });
            })
            .catch((error) => res.status(400).send(error));
    },

    getByUserId(req, res) {
        return Purchase.findAll({ where: { userId: req.params.userId } })
            .then((purchases) => {
                res.status(200).send({ purchases });
            })
            .catch((error) => res.status(400).send(error));
    },

    update(req, res) {
        return Purchase.update({ rating: req.body.rating }, { where: { id: req.params.id } })
            .then((purchase) => {
                res.status(200).send({ purchase });
            })
            .catch((error) => res.status(400).send(error));
    },
};