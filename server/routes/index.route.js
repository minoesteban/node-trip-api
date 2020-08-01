const user = require("./user.route");
const trip = require("./trip.route");
const place = require("./place.route");
const purchase = require('./purchase.route');
const rating = require('./rating.route');

module.exports = app => {
    app.get("/api-status", (req, res) =>
        res.status(200).send({
            message: "ok"
        })
    );
    app.use('/api/user', user);
    app.use('/api/trip', trip);
    app.use('/api/trip', place); // /:tripId/place
    app.use('/api/purchase', purchase);
    app.use('/api/rating', rating);
};