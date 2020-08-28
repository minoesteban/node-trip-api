const Place = require('../models').Place;
const Trip = require('../models').Trip;
const Rating = require('../models').Rating;
const AWS = require('aws-sdk');
const s3 = new AWS.S3({ signatureVersion: 'v4' });
const uuid = require('uuid');

module.exports = {
    create(req, res) {
        return Place.create(req.body)
            .then((place) => res.status(200).send({ place }))
            .catch((error) => res.status(400).send(error));
    },

    delete(req, res) {
        return Place.destroy({
                where: { id: req.params.id, tripId: req.params.tripId },
            })
            .then((item) => {
                if (item > 0) res.status(200).send({ item });
                else
                    res
                    .status(400)
                    .send({ result: `no place found with id ${req.params.id}` });
            })
            .catch((error) => res.status(400).send(error));
    },

    update(req, res) {
        return Place.update(req.body, {
                where: { id: req.params.id, tripId: req.params.tripId },
            })
            .then((item) => {
                if (item > 0)
                    Place.findOne({
                        where: { id: req.params.id },
                    }).then((place) => {
                        res.status(200).send({ place });
                    });
                else
                    res
                    .status(400)
                    .send({ result: `no place found with id ${req.params.id}` });
            })
            .catch((error) => res.status(400).send(error));
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

    getSignedUrlPut(req, res) {
        let extension = req.query.type.toLowerCase().trim();
        let isFullAudio = req.query.isFull;
        console.log(`isFullAudio ${isFullAudio}`);
        let fileType = extension.replace('jpg', 'jpeg');
        let contentType = '';
        let key = '';
        let audio_types = process.env.AUDIO_TYPES.split(',');
        let image_types = process.env.IMAGE_TYPES.split(',');
        if (image_types.indexOf(extension) > 0) {
            contentType = `image/${fileType}`;
            key = `trips/${req.params.tripId}/${process.env.IMAGE_FOLDER}/places/${
        req.params.id
      }/${uuid.v4()}.${extension}`;
        }

        if (audio_types.indexOf(extension) > 0) {
            contentType = `audio/${fileType}`;
            key = `trips/${req.params.tripId}/${process.env.AUDIO_FOLDER}/places/${
        req.params.id
      }/${uuid.v4()}.${extension}`;
        }

        let bucket = process.env.S3_BUCKET;
        if (isFullAudio == 'true') bucket = process.env.S3_BUCKET_SECURED;

        let url = process.env.S3_URL;
        if (isFullAudio == 'true') url = process.env.S3_URL_SECURED;

        let params = {
            Bucket: bucket,
            Key: key,
            Expires: 60 * 60,
            ContentType: contentType,
            // ACL: 'public-read',
        };
        s3.getSignedUrlPromise('putObject', params)
            .then((uploadUrl) => {
                console.log(uploadUrl);
                res.status(200).send({
                    uploadUrl,
                    downloadUrl: `${url}${params.Key}`,
                });
            })
            .catch((error) => res.status(400).send(error));
    },

    getSignedUrlGet(req, res) {
        let extension = req.query.type.toLowerCase().trim();
        let isFullAudio = req.query.isFull;
        let fileName = req.query.filename;
        let key = '';
        let audio_types = process.env.AUDIO_TYPES.split(',');
        let image_types = process.env.IMAGE_TYPES.split(',');
        if (image_types.indexOf(extension) > 0) {
            key = `trips/${req.params.tripId}/${process.env.IMAGE_FOLDER}/places/${req.params.id}/${fileName}.${extension}`;
        }

        if (audio_types.indexOf(extension) > 0) {
            key = `trips/${req.params.tripId}/${process.env.AUDIO_FOLDER}/places/${req.params.id}/${fileName}.${extension}`;
        }

        let bucket = process.env.S3_BUCKET;
        if (isFullAudio == 'true') bucket = process.env.S3_BUCKET_SECURED;

        let url = process.env.S3_URL;
        if (isFullAudio == 'true') url = process.env.S3_URL_SECURED;

        let params = {
            Bucket: bucket,
            Key: key,
            Expires: 60 * 60,
        };
        s3.getSignedUrlPromise('getObject', params)
            .then((downloadUrl) => {
                res.status(200).send({ downloadUrl });
            })
            .catch((error) => res.status(400).send(error));
    },
};