const express = require('express');
const cdpRouter = require('./cdpRoutes');
const lqvRouter = require('./lqvRoutes');

const ecoinRouter = require('./ecoinRoutes');
const scRouter = require('./scRoutes');
const apiRouter = express.Router();

apiRouter.use('/cdp', cdpRouter);
apiRouter.use('/lqv', lqvRouter);
apiRouter.use('/ecoin', ecoinRouter);
apiRouter.use('/sc', scRouter);
module.exports = apiRouter;
