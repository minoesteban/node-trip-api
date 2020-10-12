'use strict';
const User = require('../models/index').User;
const AWS = require('aws-sdk');
const s3 = new AWS.S3({ signatureVersion: 'v4' });
const uuid = require('uuid');
const mailer = require('../utils/send-email');

module.exports = {
    create(req, res) {
        let PIN = Math.floor(Math.random() * 900000) + 100000;
        return User.create({
                username: req.body.username,
                password: req.body.password,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                about: req.body.about,
                active: 0,
                pin: PIN,
            })
            .then((_) =>
                mailer
                .sendEmail({ email: req.body.username, PIN: PIN }, 'registered')
                .then((result) => {
                    console.log(result);
                    res.status(200).send({ success: true, message: 'user created' });
                })
            )
            .catch((error) => {
                console.log(error);
                if (error.name === 'SequelizeUniqueConstraintError') {
                    res.status(400).send({ success: false, message: 'email is already registered' });
                } else {
                    res.status(500).send({ success: false, message: error });
                }
            });
    },

    update(req, res) {
        return User.update({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                about: req.body.about,
                imageUrl: req.body.imageUrl,
                downloadedTrips: req.body.downloadedTrips,
                downloadedPlaces: req.body.downloadedPlaces,
                favouriteTrips: req.body.favouriteTrips,
                favouritePlaces: req.body.favouritePlaces,
                selectedLanguages: req.body.selectedLanguages,
            }, { where: { id: req.params.id }, returning: true })
            .then((item) => {
                res.status(200).send({ success: true, item });
            })
            .catch((error) => {
                console.log(error);
                res.status(500).send({ success: false, message: error });
            });
    },

    getById(req, res) {
        return User.findOne({ where: { id: req.params.id, active: true } })
            .then((user) => {
                console.log(user);
                res.status(200).send({ success: true, user });
            })
            .catch((error) => {
                console.log(error);
                res.status(500).send({ success: false, message: error });
            });
    },

    login(req, res) {
        console.log(req.body);
        return User.scope('withPassword')
            .findOne({
                where: { username: req.body.username },
            })
            .then(async function(user) {
                if (user) {
                    if (await user.validPassword(req.body.password)) {
                        if (user.active === true)
                            res.status(200).send({ success: true, message: user.id });
                        else {
                            mailer
                                .sendEmail({ email: req.body.username, PIN: user.pin }, 'registered')
                                .then((result) => {
                                    console.log(result);
                                    res.status(200).send({ success: false, message: 0 });
                                })
                        }
                    } else {
                        res.status(400).send({ success: false, message: 'invalid username or password' });
                    }
                } else {
                    res.status(400).send({ success: false, message: 'invalid username or password' });
                }
            })
            .catch((error) => {
                console.log(error);
                res.status(500).send({ success: false, message: error });
            });
    },

    activate(req, res) {
        return User.update({
                active: 1,
            }, {
                where: { username: req.body.username, pin: req.body.PIN },
            })
            .then((item) => {
                console.log(item);
                if (item > 0) res.status(200).send({ success: true, message: 'account activated' });
                else res.status(400).send({ success: false, message: 'invalid username or pincode' });
            })
            .catch((error) => {
                console.log(error);
                res.status(500).send({ success: false, message: error });
            });
    },

    getSignedUrlPut(req, res) {
        let fileType = req.query.type.toLowerCase().trim();
        let params = {
            Bucket: process.env.S3_BUCKET,
            Key: `users/${req.params.id}/${
        process.env.IMAGE_FOLDER
      }/${uuid.v4()}.${fileType}`,
            Expires: 60 * 60,
            ContentType: `image/${fileType}`,
            // ACL: 'public-read',
        };

        s3.getSignedUrlPromise('putObject', params)
            .then((uploadUrl) => {
                res.status(200).send({
                    uploadUrl,
                    downloadUrl: `${process.env.S3_URL}${params.Key}`,
                });
            })
            .catch((error) => {
                console.log(error);
                res.status(500).send({ success: false, message: error });
            });
    },
};