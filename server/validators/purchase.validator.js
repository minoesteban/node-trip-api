module.exports = {
    getBy(req, res, next) {
        if (
            (req.query.tripId &&
                Number.isInteger(Number.parseInt(req.query.tripId))) ||
            (req.query.placeId &&
                Number.isInteger(Number.parseInt(req.query.placeId))) ||
            (req.query.userId && Number.isInteger(Number.parseInt(req.query.userId)))
        )
            next();
        else
            return res
                .status(400)
                .send({ success: false, message: 'invalid filters format' });
    },

    update(req, res, next) {
        if (
            Number.isInteger(Number.parseInt(req.params.id)) &&
            Number.isInteger(Number.parseInt(req.body.rating))
        )
            next();
        else
            return res
                .status(400)
                .send({ success: false, message: 'invalid id format' });
    },
};