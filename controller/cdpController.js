


const Web3 = require('web3');
const contractabis= require('../client/src/components/ContractsData/ContractABIs.json');
const contractaddresses = require('../client/src/components/ContractsData/ContractAddresses.json');
const finalcontractabi=contractabis.cdp;
const finalcontract= contractaddresses.cdp;

const rpc = contractaddresses.rpc;
const web3= new Web3(rpc);

let cdpInstance;
async function init(){
const networkId = await web3.eth.net.getId();
 cdpInstance = await new web3.eth.Contract(
  finalcontractabi,
  finalcontract);
};
init();
const cdp={  
  
    checkEcoinRate: async (req, res) => {
	    console.log("check1");
          
        try {
         console.log("check2")
         const ecoinrate = await cdpInstance.methods.checkEcoinRate().call();
         return res.status(200).json({ecoinrate})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }		 
	
    },

 
    getUserVault: async (req, res) => {
            userwallet = req.params.wallet;          
        try {
             console.log("check2" + userwallet)
             const usercup = await cdpInstance.methods.debtor(userwallet).call();
             if (usercup=="0"){
                return res.status(200).json("No Vault")
             }
             if (usercup !== "0") {
                 let uservault =[];
                 for(i = usercup; i>0; i--){
             const uservault2 = await cdpInstance.methods.cupNo(userwallet, i).call();
             const final = await cdpInstance.methods.cups(uservault2).call();
                        uservault.push(final);
            }
             return res.status(200).json({uservault})
             } else {return res.status(200).json("No Vault")}
            }  catch (err) {
            return res.status(500).json({msg: err.message})
         };		
        },
	
        

    
    vaultxdcbalance: async (req, res) => {
        try{
            const vaultbal = await cdpInstance.methods.checkXDCbalcance().call();
            return res.status(200).json({vaultbal});
        } catch (err) {
            return res.status(500).json({msg: err.message});
        };

    },

    taxrate: async (req, res) => {
        try{
            const taxrate = await cdpInstance.methods.taxrate().call();
            return res.status(200).json({taxrate});
        } catch (err) {
            return res.status(500).json({msg: err.message});
        };

    }
    };
module.exports = cdp;