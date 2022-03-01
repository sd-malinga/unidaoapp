
const express = require('express');
const cdpRouter = express.Router();
const { checkEcoinRate, getUserVault, vaultxdcbalance, taxrate } =require('../controller/cdpController');


cdpRouter.get('/getecoinrate', checkEcoinRate);

cdpRouter.get('/getuservault/:wallet', getUserVault);

cdpRouter.get('/getxdcbalance', vaultxdcbalance);

cdpRouter.get('/gettaxrate', taxrate);







module.exports = cdpRouter;