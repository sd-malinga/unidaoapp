import React, { Fragment, useEffect, useState } from "react";
import { getxdcbalance, gettaxrate } from "../../services/cdpServices";
import { getEcoinBalanceOf } from "../../services/ecoinServices";
import { getTotalSupply, getuserbalance } from "../../services/scServices";
import contractaddresses from '../../components/ContractsData/ContractAddresses.json';
import { ethers } from "ethers";
import { getUserVault } from "../../services/cdpServices";
import ContractAddresses from '../../components/ContractsData/ContractAddresses.json';
import ContractABIs from '../../components/ContractsData/ContractABIs.json';
import Web3 from "web3";
const Home = ()=> {
const [taxrate, settaxrate]= useState('');
const [totalsupply, settotalsupply] = useState('');
const [xdctvl, setxdctvl] = useState('');
const[ecointvl, setecointvl] = useState("");
const [userbal, setuserbal] = useState('');
const [uservault, setvault] = useState('');
const userwallet= sessionStorage.getItem('wallet');
const vaultcheck = async () => {
const uservault = await getUserVault(userwallet);
if(uservault == 'No Vault'){
    setvault(uservault);
} else {
console.log(uservault.uservault);
setvault(uservault.uservault)
}

};
const [ocr, setocr] = useState('0');
const checkbalance = async()=> {
    try {
        const rpc = contractaddresses.rpc2;
        const web3= new Web3(rpc);
        const  ecoinInstance = await new web3.eth.Contract(
            ContractABIs.ecoin,
            ContractAddresses.ecoin
            );
        const  govInstance = await new web3.eth.Contract(
                ContractABIs.gov,
                ContractAddresses.gov
                );
        
        const  scInstance = await new web3.eth.Contract(
                    ContractABIs.sc,
                    ContractAddresses.sc
                    );
     const  cdpInstance = await new web3.eth.Contract(
                        ContractABIs.cdp,
                        ContractAddresses.cdp
                        );

     console.log("check2")
     const cdpocr = await cdpInstance.methods.ocr().call();
     setocr(cdpocr);
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
    setuserbal(finaldata);
} catch(err) {console.log(err)}


}

const walletshow = ()=> {
    return(
        <div className="glosarry">
        <h3 style={{alignSelf: ''}}>Your Wallet Detais</h3>  
       <strong>XDC Balance: {userbal.xdc/10**18}</strong>   
       <strong>Ecoin Balance: {userbal.ecoin/10**10}</strong>           
       <strong>XUSD Balance: {userbal.sc/10**18}</strong>           
       <strong>UDAO Balance: {userbal.gov/10**18}</strong> 
   </div>  
    )
}

useEffect(()=>{
    vaultcheck();
    checkbalance();
  
},[]);

const openvault = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    
    const netid = await provider.getNetwork()
    
    if (netid.chainId == 51) {
        try{
        const signer = provider.getSigner();
        const accounts = await signer.getAddress();
        const vaultinstance = new ethers.Contract(
            ContractAddresses.cdp,
            ContractABIs.cdp,
            signer
        );
        const VaultOpen = await vaultinstance.functions.open();
        console.log(VaultOpen);
        const cop = await VaultOpen.wait();
        window.open(`/vault`, '_self')
        } catch(err){window.alert('Try Again')}
    } else {window.alert('Please Connect to Apothem Network')}
}



function entervault(id){
    if (sessionStorage.getItem('wallet') === null){
        window.alert('Connect Your Wallet')
    } else {
        window.open(`/vault/access/${id}`, '_self');
    }

}


const rendervaults = ()=> {
    return (
        <div className="homevaultflex">
      {uservault.map((item, idx)=>{
          return(
                <Fragment>
                    <button className='beautifulbtn' onClick={()=>{entervault(idx)}}>Access Vault {idx +1}</button>
                </Fragment>
      )})}
      
       </div>
     ) }

  

  
const vaultdetails = ()=>{
      return (
          <Fragment>
             <div className='openvault' style={{
                 gap: '10px'
             }}>
              
             {rendervaults()}
             <button className='beautifulbtn' onClick={()=>{openvault()}}>Create New Vault </button>
             </div>
             
          </Fragment>

      )
}

const vcrender = () => {
  if (uservault ==='No Vault') {
      return (

      <Fragment>
          <div className='openvault'>
              <p>Sorry You have no vault. Please Open a new Vault.</p>
              <button className=' beautifulbtn' onClick={()=>{openvault()}}>Open A Vault</button>
          </div>
      </Fragment>

  )
} else if (uservault ==""){
  return(
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
    <p>Please Wait</p>
    <img src={'/loading.gif'} height={'150px'} width={'150px'} />
    </div>
  )

}
   else {
       return vaultdetails()
   }
}




useEffect(()=>{
 const balancecheck = async () =>{
    const baldata = await  getxdcbalance();
    console.log(baldata);
    setxdctvl(baldata.vaultbal);
    const ebaldata = await getEcoinBalanceOf(contractaddresses.cdp);
    setecointvl(ebaldata.ecoinbalance);
    const taxrateis = await gettaxrate();
    settaxrate(taxrateis.taxrate);
    const totalsupplyis = await getTotalSupply();
    settotalsupply(totalsupplyis.totalSupply);
 };
 balancecheck();
}, [])
 
    return(
        <Fragment>
            <div className="mainapp">
                <h1>Welcome to UNIDAO</h1> 
                <div className="homeflex">
                    <div className="glosarry">
                        <h3 style={{alignSelf: ''}}>UNIDAO at a glance</h3>  
                        
                              
                        <strong>Total XUSD Supply: {(totalsupply)/10**18}</strong>           
                        <strong>Current Tax Rate: {taxrate}%</strong> 
                        <strong>Over- Collateralization Ratio: {(ocr)+'%'}</strong>   
                    </div>   
                   {walletshow()}          
                </div>
                <div className="homevaults">
                    <h3>Your Vaults</h3>
                    {vcrender()}
                    



                    </div>
                </div>
            

        </Fragment>
    )

}
export default Home