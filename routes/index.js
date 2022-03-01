const express = require('express');
const cdpRouter = require('./cdpRoutes');
const ecoinRouter = require('./ecoinRoutes');
const scRouter = require('./scRoutes');
const apiRouter = express.Router();

apiRouter.use('/cdp', cdpRouter);
apiRouter.use('/ecoin', ecoinRouter);
apiRouter.use('/sc', scRouter);
module.exports = apiRouter;
