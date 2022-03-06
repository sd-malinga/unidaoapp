
const express = require('express');
const { totalSupply, userdata } = require('../controller/scController');
const scRouter = express.Router();


scRouter.get('/xusdtotalsupply', totalSupply);
scRouter.get('/getuserbalance/:wallet', userdata );






module.exports = scRouter;