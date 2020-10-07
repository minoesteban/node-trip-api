'use strict';
const validator = require('validator');

module.exports = {
    create(req, res, next) {
        if (
            req.body.username &&
            req.body.password &&
            validator.isEmail(req.body.username) &&
            module.exports.validPassword(req.body.password)
        )
            next();
        else return res.status(400).send('invalid password or username');
    },

    login(req, res, next) {
        if (req.body.username && req.body.password) next();
        else return res.status(400).send(false);
    },

    activate(req, res, next) {
        if (req.body.username && req.body.PIN) next();
        else return res.status(400).send(false);
    },

    getById(req, res, next) {
        if (
            Number.isInteger(Number.parseInt(req.params.id)) &&
            Number.parseInt(req.params.id) > 0
        )
            next();
        else
            return res
                .status(400)
                .send({ success: false, message: 'invalid id format' });
    },

    update(req, res, next) {
        if (
            Number.isInteger(Number.parseInt(req.params.id)) &&
            Number.parseInt(req.params.id) > 0
        )
            next();
        else
            return res
                .status(400)
                .send({ success: false, message: 'invalid id format' });
    },

    getSignedUrlPut(req, res, next) {
        if (
            Number.isInteger(Number.parseInt(req.params.id)) &&
            Number.parseInt(req.params.id) > 0
        ) {
            let image_types = process.env.IMAGE_TYPES.split(',');
            if (
                req.query.type &&
                image_types.indexOf(req.query.type.toLowerCase().trim()) > 0
            ) {
                next();
            } else
                return res
                    .status(400)
                    .send({ success: false, message: 'invalid file type' });
        } else
            return res
                .status(400)
                .send({ success: false, message: 'invalid id format' });
    },

    validPassword(Password) {
        if (Password) {
            Password = Password.toString();
            let regularExpresionForPaswword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
            if (
                validator.isLength(Password, [{
                    min: 8,
                    max: undefined,
                }, ]) &&
                regularExpresionForPaswword.test(Password)
            )
                return true;

            return false;
        }

        return false;
    },
};