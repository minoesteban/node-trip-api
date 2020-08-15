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
};