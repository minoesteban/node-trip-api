const user = require("./user.controller");
const trip = require("./trip.controller");
const place = require("./place.controller");
const purchase = require('./purchase.controller');
const rating = require('./rating.controller');

module.exports = {
    user,
    trip,
    place,
    purchase,
    rating
};