const express = require('express');
const bodyParser = require('body-parser');
const serverless = require('serverless-http');

const APP_VERSION = process.env.APP_VERSION || '1.0';

const app = express();
app.use(bodyParser.json({ limit: '15MB', type: 'application/json' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', (req, res, next) => {
    console.debug(`${req.method} ${req.path}`);
    next();
});

const User = require('../routes/user.route');
app.use(`/api/${APP_VERSION}/users`, User);

module.exports.handler = serverless(app);