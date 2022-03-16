const fetch = require('node-fetch');
const cron = require('node-cron');


const Web3 = require('web3');
const contractabis= require('../client/src/components/ContractsData/ContractABIs.json');
const contractaddresses = require('../client/src/components/ContractsData/ContractAddresses.json');
const cdp = require('./cdpController');
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

const address ='0x7803e84ebd1737c3e0bd2403bd617e0dfc5fb089'
const privatekey = "a0fb18670a97fe3f233f586c6104063c521903791764180bf8164bf1cdd4d2d9";
cron.schedule("*/10 * * * * *", function() {
    async function rnow1() {
         try{
             const cupi = await cdpInstance.methods.cupi().call();
             console.log(cupi);
             let userwallet='0x93CEae1C3DF0B67c633c2c59f27c176545171400'
             for ( let i = 1; i<= cupi; i++) {
            try {
            const grabCollateral= await cdpInstance.methods.grabCollateral(web3.utils.asciiToHex(i))
             const gas= await grabCollateral.estimateGas({from:address})
             const data=grabCollateral.encodeABI();
             console.log("check4");
             const nonce= await web3.eth.getTransactionCount(address)
             const signedTx = await web3.eth.accounts.signTransaction({
                      to:cdpInstance.options.address,
                      data,
                      gas,
                      nonce:nonce,
                      chainId:networkId
                },privatekey
                )
             console.log("check 5");
             const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction)
             console.log(receipt,"transaction receipt");
             if(receipt.status==true){
                   return res.json({msg: `transaction sucess! Hash :${receipt.transactionHash}`})
               } else{
                   console.log('not grabbed' + i)
               }
            } catch (err) {
                console.log('not grabbed'+ i)
            }
      
             }
          } catch(err) {console.log(err)}
    }

    rnow1();

console.log("Task Completed Once")
});
