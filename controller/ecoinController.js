


const Web3 = require('web3');
const contractabis= require('../client/src/components/ContractsData/ContractABIs.json');
const contractaddresses = require('../client/src/components/ContractsData/ContractAddresses.json');
const finalcontractabi=contractabis.ecoin;
const finalcontract= contractaddresses.ecoin;

const rpc = contractaddresses.rpc;
const web3= new Web3(rpc);

let ecoinInstance;
async function init(){
const networkId = await web3.eth.net.getId();
 ecoinInstance = await new web3.eth.Contract(
  finalcontractabi,
  finalcontract);
};
init();
const ecoin={  
  
    balanceOf: async (req, res) => {
        userwallet = req.params.wallet;
	    console.log("check1");
          
        try {
         console.log("check2")
         const ecoinbalance = await ecoinInstance.methods.balanceOf(userwallet).call();
         return res.status(200).json({ecoinbalance})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }		 
	
    },



    }
module.exports = ecoin;
