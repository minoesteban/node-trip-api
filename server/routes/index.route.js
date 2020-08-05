const user = require('./user.route');
const trip = require('./trip.route');
const place = require('./place.route');
const purchase = require('./purchase.route');
const rating = require('./rating.route');

module.exports = (app) => {
    app.get('/api-status', (req, res) =>
        res.status(200).send({
            message: 'ok',
        })
    );
    app.use('/api/users', user);
    app.use('/api/trips', trip);
    app.use('/api/trips', place); // /:tripId/place
    app.use('/api/purchases', purchase);
    app.use('/api/ratings', rating);
};