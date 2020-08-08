const Trip = require('../models').Trip;
const Place = require('../models').Place;
const Rating = require('../models').Rating;
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

module.exports = {
    create(req, res) {
        console.log('create');
        console.log(JSON.stringify(req.body));
        return Trip.create(req.body, { include: [{ model: Place }] })
            .then((trip) => res.status(200).send({ trip }))
            .catch((error) => res.status(400).send(error));
    },

    delete(req, res) {
        return Trip.destroy({ where: { id: req.params.id } })
            .then((item) => {
                if (item > 0) res.status(200).send({ item });
                else
                    res
                    .status(400)
                    .send({ result: `no trip found with id ${req.params.id}` });
            })
            .catch((error) => res.status(400).send(error));
    },

    update(req, res) {
        console.log('udpate');
        console.log(JSON.stringify(req.body));
        return Trip.update(req.body, {
                where: { id: req.params.id },
            })
            .then((item) => {
                if (item > 0)
                    Trip.findOne({
                        where: { id: req.params.id },
                        include: { model: Place, include: Rating },
                    }).then((trip) => {
                        res.status(200).send({ trip });
                    });
                else
                    res
                    .status(400)
                    .send({ result: `no trip found with id ${req.params.id}` });
            })
            .catch((error) => res.status(400).send(error));
    },

    getAll(_, res) {
        return Trip.findAll({ include: { model: Place, include: Rating } })
            .then((trips) => {
                res.status(200).send({ trips });
            })
            .catch((error) => res.status(400).send(error));
    },

    getById(req, res) {
        return Trip.findOne({
                where: { id: req.params.id },
                include: { model: Place, include: Rating },
            })
            .then((trip) => {
                res.status(200).send({ trip });
            })
            .catch((error) => res.status(400).send(error));
    },

    getByOwnerId(req, res) {
        return Trip.findAll({
                where: { ownerId: req.params.ownerId },
                include: { model: Place, include: Rating },
            })
            .then((trips) => {
                res.status(200).send({ trips });
            })
            .catch((error) => res.status(400).send(error));
    },

    uploadAudio(req, res) {
        let data = Buffer.from(req.body.file, 'base64');
        let params = {
            Bucket: process.env.S3_BUCKET,
            Key: `trip-${req.params.id}/${process.env.AUDIO_FOLDER}/trip-${req.params.id}-preview.${req.body.extension}`,
            Body: data,
        };
        s3.upload(params)
            .promise()
            .then((data) => {
                data.key;
                Trip.update({ previewAudioUrl: data.key }, {
                        where: { id: req.params.id },
                    })
                    .then((item) => {
                        if (item > 0)
                            Trip.findOne({ where: { id: req.params.id } }).then((trip) => {
                                res.status(200).send({ trip });
                            });
                        else
                            res
                            .status(400)
                            .send({ result: `no trip found with id ${req.params.id}` });
                    })
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    uploadImage(req, res) {
        let data = Buffer.from(req.body.file, 'base64');
        let params = {
            Bucket: process.env.S3_BUCKET,
            Key: `trip-${req.params.id}/${process.env.IMAGE_FOLDER}/trip-${req.params.id}.${req.body.extension}`,
            Body: data,
        };
        s3.upload(params)
            .promise()
            .then((data) => {
                data.key;
                Trip.update({ imageUrl: data.key }, {
                        where: { id: req.params.id },
                    })
                    .then((item) => {
                        if (item > 0)
                            Trip.findOne({ where: { id: req.params.id } }).then((trip) => {
                                res.status(200).send({ trip });
                            });
                        else
                            res
                            .status(400)
                            .send({ result: `no trip found with id ${req.params.id}` });
                    })
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
};