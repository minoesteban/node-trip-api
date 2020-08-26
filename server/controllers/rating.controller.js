const { sequelize } = require('../models');
const Rating = require('../models').Rating;

module.exports = {
    create(req, res) {
        return Rating.create({
                userId: req.body.userId,
                placeId: req.body.placeId,
                tripId: req.body.tripId,
                rating: req.body.rating,
            })
            .then((item) =>
                res.status(200).send({
                    success: true,
                    message: 'Rating successfully created.',
                    item,
                })
            )
            .catch((error) => res.status(400).send(error));
    },

    getAll(_, res) {
        return Rating.findAll({
                attributes: [
                    'tripId',
                    'placeId', [sequelize.fn('avg', sequelize.col('rating')), 'rating'],
                    [sequelize.fn('count', sequelize.col('rating')), 'count'],
                ],
                group: ['tripId', 'placeId'],
            })
            .then((ratings) => {
                res.status(200).send({
                    success: true,
                    message: 'ok',
                    ratings,
                });
            })
            .catch((error) => res.status(400).send(error));
    },

    getBy(req, res) {
        var filters = { tripId: null, placeId: null, userId: null };

        req.query.tripId ?
            (filters.tripId = Number.parseInt(req.query.tripId)) :
            delete filters.tripId;
        req.query.placeId ?
            (filters.placeId = Number.parseInt(req.query.placeId)) :
            delete filters.placeId;
        req.query.userId ?
            (filters.userId = Number.parseInt(req.query.userId)) :
            delete filters.userId;

        return Rating.findAll({
                attributes: [
                    'tripId',
                    'placeId', [sequelize.fn('avg', sequelize.col('rating')), 'rating'],
                    [sequelize.fn('count', sequelize.col('rating')), 'count'],
                ],
                group: ['tripId', 'placeId'],
                where: filters,
            })
            .then((ratings) => {
                res.status(200).send({
                    success: true,
                    message: 'ok',
                    ratings,
                });
            })
            .catch((error) => res.status(400).send(error));
    },

    update(req, res) {
        return Rating.update({ rating: req.body.rating }, { where: { id: req.params.id } })
            .then((rating) => {
                res.status(200).send({
                    success: true,
                    message: 'ok',
                    ratings,
                });
            })
            .catch((error) => res.status(400).send(error));
    },
};