const User = require('../models/index').User;
const AWS = require('aws-sdk');
const s3 = new AWS.S3({ signatureVersion: 'v4' });
const uuid = require('uuid');
const { response } = require('express');

module.exports = {
    create(req, res) {
        return User.create({
                username: req.body.username,
                password: req.body.password,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                about: req.body.about,
            })
            .then((item) => res.status(200).send({ item }))
            .catch((error) => res.status(400).send(error));
    },

    update(req, res) {
        return User.update({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                about: req.body.about,
                imageUrl: req.body.imageUrl,
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
            .then((item) => res.status(200).send({ item }))
            .catch((error) => res.status(400).send(error));
    },

    getById(req, res) {
        return User.findOne({ where: { id: req.params.id, active: true } })
            .then((user) => {
                res.status(200).send({ user });
            })
            .catch((error) => res.status(400).send(error));
    },

    getByUsername(req, res) {
        return User.findOne({
                where: { username: req.body.username, active: true },
            })
            .then((user) => {
                res.status(200).send({ user });
            })
            .catch((error) => res.status(400).send(error));
    },

    getAll(req, res) {
        return User.findAll({ where: { active: true } })
            .then((users) => {
                res.status(200).send({ users });
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
                        result: 'username or password invalid',
                    });
                } else {
                    if (!(await user.validPassword(req.body.password))) {
                        res.status(400).send({
                            result: 'username or password invalid',
                        });
                    } else {
                        res.status(200).send({ user });
                    }
                }
            })
            .catch((error) => res.status(400).send(error));
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
            .catch((error) => res.status(400).send(error));
    },
    // getImage(req, res) {
    //     let key = '';
    //     key = req.params.key;
    //     let params = {
    //         Bucket: process.env.S3_BUCKET,
    //         Key: `users/images/${key}`,
    //         ResponseContentType: `image/${key
    //     .substring(key.indexOf('.'))
    //     .replace('.', '')
    //     .replace('jpg', 'jpeg')}`,
    //     };
    //     s3.getObject(params)
    //         .promise()
    //         .then((data) => {
    //             res.writeHead(200, {
    //                 'Content-Type': `image/${key
    //         .substring(key.indexOf('.'))
    //         .replace('.', '')
    //         .replace('jpg', 'jpeg')}`,
    //             });
    //             res.end(Buffer.from(data.Body).toString('base64'));
    //             // res.status(200).send(data.Body.toString('base64'));
    //         })
    //         .catch((error) => res.status(400).send(error));
    // },
};