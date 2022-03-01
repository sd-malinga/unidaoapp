
const express = require('express');
const { balanceOf } = require('../controller/ecoinController');
const ecoinRouter = express.Router();


ecoinRouter.get('/getbalanceof/:wallet', balanceOf);







module.exports = ecoinRouter;