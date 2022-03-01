
const express = require('express');
const { totalSupply } = require('../controller/scController');
const scRouter = express.Router();


scRouter.get('/xusdtotalsupply', totalSupply);







module.exports = scRouter;