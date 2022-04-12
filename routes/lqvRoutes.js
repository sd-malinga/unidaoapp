
const express = require('express');
const lqvRouter = express.Router();
const { checkBalance, checkExchangeRates } =require('../controller/lqvController');


lqvRouter.get('/getlqvbalance', checkBalance);
lqvRouter.get('/getlqvrates', checkExchangeRates );








module.exports = lqvRouter;