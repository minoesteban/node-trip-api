const Place = require('../models').Place;
const Trip = require('../models').Trip;
const Rating = require('../models').Rating;
const AWS = require('aws-sdk');
const s3 = new AWS.S3({ signatureVersion: 'v4' });
const uuid = require('uuid');

module.exports = {
    create(req, res) {
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
        return Trip.update(req.body, {
                where: { id: req.params.id },
            })
            .then((item) => {
                if (item > 0)
                    Trip.findOne({
                        where: { id: req.params.id },
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

    getSignedUrlPut(req, res) {
        let extension = req.query.type.toLowerCase().trim();
        let fileType = extension.replace('jpg', 'jpeg');
        let contentType = '';
        let key = '';
        let audio_types = process.env.AUDIO_TYPES.split(',');
        let image_types = process.env.IMAGE_TYPES.split(',');
        if (image_types.indexOf(extension) > 0) {
            contentType = `image/${fileType}`;
            key = `trips/${req.params.id}/${
        process.env.IMAGE_FOLDER
      }/${uuid.v4()}.${extension}`;
        }

        if (audio_types.indexOf(extension) > 0) {
            contentType = `audio/${fileType}`;
            key = `trips/${req.params.id}/${
        process.env.AUDIO_FOLDER
      }/${uuid.v4()}.${extension}`;
        }

        let params = {
            Bucket: process.env.S3_BUCKET,
            Key: key,
            Expires: 60 * 60,
            ContentType: contentType,
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

    // uploadAudio(req, res) {
    //     let data = Buffer.from(req.body.file, 'base64');
    //     let params = {
    //         Bucket: process.env.S3_BUCKET,
    //         Key: `trip-${req.params.id}/${process.env.AUDIO_FOLDER}/trip-${req.params.id}-preview.${req.body.extension}`,
    //         Body: data,
    //     };
    //     s3.upload(params)
    //         .promise()
    //         .then((data) => {
    //             data.key;
    //             Trip.update({ previewAudioUrl: data.key }, {
    //                     where: { id: req.params.id },
    //                 })
    //                 .then((item) => {
    //                     if (item > 0)
    //                         Trip.findOne({ where: { id: req.params.id } }).then((trip) => {
    //                             res.status(200).send({ trip });
    //                         });
    //                     else
    //                         res
    //                         .status(400)
    //                         .send({ result: `no trip found with id ${req.params.id}` });
    //                 })
    //                 .catch((error) => res.status(400).send(error));
    //         })
    //         .catch((error) => res.status(400).send(error));
    // },

    // uploadImage(req, res) {
    //     let data = Buffer.from(req.body.file, 'base64');
    //     let params = {
    //         Bucket: process.env.S3_BUCKET,
    //         Key: `trip-${req.params.id}/${process.env.IMAGE_FOLDER}/trip-${req.params.id}.${req.body.extension}`,
    //         Body: data,
    //     };
    //     s3.upload(params)
    //         .promise()
    //         .then((data) => {
    //             data.key;
    //             Trip.update({ imageUrl: data.key }, {
    //                     where: { id: req.params.id },
    //                 })
    //                 .then((item) => {
    //                     if (item > 0)
    //                         Trip.findOne({ where: { id: req.params.id } }).then((trip) => {
    //                             res.status(200).send({ trip });
    //                         });
    //                     else
    //                         res
    //                         .status(400)
    //                         .send({ result: `no trip found with id ${req.params.id}` });
    //                 })
    //                 .catch((error) => res.status(400).send(error));
    //         })
    //         .catch((error) => res.status(400).send(error));
    // },
};