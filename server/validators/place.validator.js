module.exports = {
    getById(req, res, next) {
        if (
            Number.isInteger(Number.parseInt(req.params.id)) &&
            Number.isInteger(Number.parseInt(req.params.tripId)) &&
            Number.parseInt(req.params.id) > 0 &&
            Number.parseInt(req.params.tripId) > 0
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
            Number.isInteger(Number.parseInt(req.params.tripId)) &&
            Number.parseInt(req.params.id) > 0 &&
            Number.parseInt(req.params.tripId) > 0
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
            Number.isInteger(Number.parseInt(req.params.tripId)) &&
            Number.parseInt(req.params.id) > 0 &&
            Number.parseInt(req.params.tripId) > 0
        )
            next();
        else
            return res
                .status(400)
                .send({ success: false, message: 'invalid id format' });
    },

    getByTripId(req, res, next) {
        if (
            Number.isInteger(Number.parseInt(req.params.tripId)) &&
            Number.parseInt(req.params.tripId) > 0
        )
            next();
        else
            return res
                .status(400)
                .send({ success: false, message: 'invalid id format' });
    },
};