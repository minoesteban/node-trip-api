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
};