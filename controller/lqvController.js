



const Web3 = require('web3');
const contractabis= require('../client/src/components/ContractsData/ContractABIs.json');
const contractaddresses = require('../client/src/components/ContractsData/ContractAddresses.json');
const finalcontractabi=contractabis.lqv;
const finalcontract= contractaddresses.lqv;

const rpc = contractaddresses.rpc;
const web3= new Web3(rpc);

let lqvInstance;
async function init(){
const networkId = await web3.eth.net.getId();
lqvInstance = await new web3.eth.Contract(
  finalcontractabi,
  finalcontract);
};
init();
const lqv={  
  
    checkBalance: async (req, res) => {
	    console.log("check1");
          
        try {
         console.log("check2")
         const ecoinbalance = await lqvInstance.methods.EcoinFog().call();
         const xdcbalance = await lqvInstance.methods.XDCFog().call();
         const scbalance = await lqvInstance.methods.joy().call();

        const lqvbalance = {
            ecoin: ecoinbalance,
            xdc: xdcbalance,
            sc: scbalance
        };
         return res.status(200).json(lqvbalance)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }		 
	
    },
    checkExchangeRates: async (req, res) => {
	    console.log("check1");
          
        try {
         console.log("check2")
         const scToEcoin = await lqvInstance.methods.askForEcoin('1000000000000000000').call();
         const scToXDC = await lqvInstance.methods.askForXDC('1000000000000000000').call();
         const EcoinTosc = await lqvInstance.methods.bidEcoin('1000000000000000').call()/100000;
         const XDCTosc = await lqvInstance.methods.bidXDC('10000000000000000000000').call()/10000;
         const e1 = EcoinTosc;
        const lqvbalance = {
            s2e: scToEcoin,
            s2x: scToXDC,
            e2s: e1,
            x2s: XDCTosc
        };
         return res.status(200).json(lqvbalance)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }		 
	
    },


 
 
    };
module.exports = lqv;