module.exports = {
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
    getByOwnerId(req, res, next) {
        if (
            Number.isInteger(Number.parseInt(req.params.ownerId)) &&
            Number.parseInt(req.params.ownerId) > 0
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
    delete(req, res, next) {
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
            let audio_types = process.env.AUDIO_TYPES.split(',');
            let image_types = process.env.IMAGE_TYPES.split(',');
            if (
                audio_types.indexOf(req.query.type.toLowerCase().trim()) > 0 ||
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

    getSignedUrlGet(req, res, next) {
        if (
            Number.isInteger(Number.parseInt(req.params.id)) &&
            Number.parseInt(req.params.id) > 0
        ) {
            let audio_types = process.env.AUDIO_TYPES.split(',');
            let image_types = process.env.IMAGE_TYPES.split(',');
            if (
                audio_types.indexOf(req.query.type.toLowerCase().trim()) > 0 ||
                image_types.indexOf(req.query.type.toLowerCase().trim()) > 0
            ) {
                if (req.query.filename) {
                    next();
                } else {
                    return res
                        .status(400)
                        .send({ success: false, message: 'invalid file name' });
                }
            } else
                return res
                    .status(400)
                    .send({ success: false, message: 'invalid file type' });
        } else
            return res
                .status(400)
                .send({ success: false, message: 'invalid id format' });
    },
};