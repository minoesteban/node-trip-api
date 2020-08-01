const User = require('../models').User;

module.exports = {
    create(req, res) {
        return User.create({
                // id: req.body.id,
                username: req.body.username,
                password: req.body.password,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                about: req.body.about,
            })
            .then((item) =>
                res.status(200).send({
                    success: true,
                    message: 'User successfully created.',
                    item,
                })
            )
            .catch((error) => res.status(400).send(error));
    },

    update(req, res) {
        console.log(req.params.id);
        console.log(req.body);

        return User.update({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                about: req.body.about,
                languageId1: req.body.languageId1,
                languageId2: req.body.languageId2,
                languageId3: req.body.languageId3,
                languageId4: req.body.languageId4,
                languageId5: req.body.languageId5,
                onlyNearest: req.body.onlyNearest,
                onlyFavourites: req.body.onlyFavourites,
                onlyPurchased: req.body.onlyPurchased,
                favouriteTrips: req.body.favouriteTrips,
                favouritePlaces: req.body.favouritePlaces,
                purchasedTrips: req.body.purchasedTrips,
                downloadedTrips: req.body.downloadedTrips,
                downloadedPlaces: req.body.downloadedPlaces,
            }, { where: { id: req.params.id }, returning: true })
            .then((item) =>
                res.status(200).send({
                    success: true,
                    message: 'User successfully updated.',
                    item,
                })
            )
            .catch((error) => res.status(400).send(error));
    },

    getById(req, res) {
        return User.findOne({ where: { id: req.params.id, active: true } })
            .then((user) => {
                res.status(200).send({
                    success: true,
                    message: 'ok',
                    user,
                });
            })
            .catch((error) => res.status(400).send(error));
    },

    getByUsername(req, res) {
        return User.findOne({
                where: { username: req.body.username, active: true },
            })
            .then((user) => {
                res.status(200).send({
                    success: true,
                    message: 'ok',
                    user,
                });
            })
            .catch((error) => res.status(400).send(error));
    },

    getAll(req, res) {
        return User.findAll({ where: { active: true } })
            .then((users) => {
                res.status(200).send({
                    success: true,
                    message: 'ok',
                    users,
                });
            })
            .catch((error) => res.status(400).send(error));
    },

    validUser(req, res) {
        return User.findOne({
                where: { username: req.body.username, active: true },
            })
            .then(async function(user) {
                if (!user) {
                    res.status(400).send({
                        success: false,
                        message: 'username or password invalid',
                    });
                } else {
                    if (!(await user.validPassword(req.body.password))) {
                        res.status(400).send({
                            success: false,
                            message: 'username or password invalid',
                        });
                    } else {
                        res.status(200).send({
                            success: true,
                            message: 'ok',
                            user,
                        });
                    }
                }
            })
            .catch((error) => res.status(400).send(error));
    },
};