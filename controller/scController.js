const Web3 = require('web3');
const contractabis= require('../client/src/components/ContractsData/ContractABIs.json');
const contractaddresses = require('../client/src/components/ContractsData/ContractAddresses.json');
const finalcontractabi=contractabis.sc;
const finalcontract= contractaddresses.sc;

const rpc = contractaddresses.rpc;
const web3= new Web3(rpc);

let scInstance;
async function init(){
const networkId = await web3.eth.net.getId();
 scInstance = await new web3.eth.Contract(
  finalcontractabi,
  finalcontract);
};
init();
const sc={  
  
    totalSupply: async (req, res) => {
        
	    console.log("check1");
          
        try {
         console.log("check2")
         const totalSupply = await scInstance.methods.totalSupply().call();
         return res.status(200).json({totalSupply})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }		 
	
    },

    userdata: async (req, res) => {
        userwallet = req.params.wallet;   
	    console.log("check1");
          
        try {
            const  ecoinInstance = await new web3.eth.Contract(
                contractabis.ecoin,
                contractaddresses.ecoin
                );
            const  govInstance = await new web3.eth.Contract(
                    contractabis.gov,
                    contractaddresses.gov
                    );

         console.log("check2")
         const scbalance = await scInstance.methods.balanceOf(userwallet).call();
         const govbalance = await govInstance.methods.balanceOf(userwallet).call();
         const ecoinbalance = await ecoinInstance.methods.balanceOf(userwallet).call();
         const xdcbalance = await web3.eth.getBalance(userwallet);
        const finaldata = {
            sc: scbalance,
            gov: govbalance,
            ecoin: ecoinbalance,
            xdc: xdcbalance,
        }
         return res.status(200).json(finaldata)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }		 
	
    },

    }

    
module.exports = sc;