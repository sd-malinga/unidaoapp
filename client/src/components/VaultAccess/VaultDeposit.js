import React, { Fragment, useEffect, useState } from 'react';
import { getUserVault } from '../../services/cdpServices';
import ContractAddresses from '../ContractsData/ContractAddresses.json';
import ContractABIs from '../ContractsData/ContractABIs.json';
import { ContractFactory, ethers } from 'ethers';
import Popup from '../Popup';
import { useParams } from 'react-router';

const VaultDeposit = () => {
    const { id } = useParams();

const [isOpen, setIsOpen] = useState(false);
 
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
const[message, setmessage] = useState('')
  
    const userwallet= sessionStorage.getItem('wallet');
    const[uservault, setvault] = useState('');

    const provider =  new ethers.providers.Web3Provider(window.ethereum);
    
   

    const vaultcheck = async () => {
        const uservault = await getUserVault(userwallet);
        if(uservault == 'No Vault'){
            setvault(uservault);
        } else {
        console.log(uservault);
        setvault(uservault)
        }
        
     };
 
     useEffect(()=>{
         vaultcheck()
     },[]);

     if (uservault ==='No Vault') {
         window.open(`/vault/access/${id}`, '_self')
     }
    
     const handleSubmit = async (e) => {
         e.preventDefault()
         const colname = document.getElementById('colname').value;
         console.log(colname);
         const amount = document.getElementById('amount').value;
         console.log(amount);
         
         if (colname==='ECOIN'){
             console.log("Collateral is Ecoin")
             const netid = await provider.getNetwork()
             if (netid.chainId == 51) {
                try{
                const signer = provider.getSigner();
                const accounts = await signer.getAddress();
                const ecoinInstace = new ethers.Contract(
                    ContractAddresses.ecoin,
                    ContractABIs.ecoin,
                    signer
                );
                const vaultinstance = new ethers.Contract(
                    ContractAddresses.cdp,
                    ContractABIs.cdp,
                    signer
                );
                
                /* global BigInt */

                const approve = await ecoinInstace.approve(ContractAddresses.cdp, BigInt((amount)*10**10));
                const receipt2 = await approve.wait();
                console.log(receipt2)

                const deposit = await vaultinstance.depositEcoin(uservault.uservault[id].ino, BigInt((amount)*10**10));
                const receipt = await deposit.wait();
                if (receipt.status == true) {
                    setmessage("XUSD has been deposited to your wallet successfully.")
                    togglePopup()
                } else {console.log(receipt)} 
            
                } catch (err) {console.log(err)}
                } else {window.alert("Change Your Network to Apothem")}
            }
         
            else if (colname ==='XDC'){

             console.log("Collateral is XDC");
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
                        /* global BigInt */

                const deposit = await vaultinstance.depositXDC(uservault.uservault[id].ino, BigInt((amount)*10**18), {value: BigInt((amount)*10**18)});
                const receipt = await deposit.wait();
                if (receipt.status == true) {
                    setmessage("XUSD has been deposited to your wallet successfully.")
                    togglePopup()
                } else {console.log(receipt)} 
            
                } catch (err) {console.log(err)}
                } else {window.alert("Change Your Network to Apothem")}
         }
         
     }
    
     return(
         <Fragment>
            <div className='depositform'>
                <form className='depositform-form' onSubmit={handleSubmit}>
                    <label>Collateral to Deposit</label>
                    <select id='colname' className='beautifulbtn'>
                        <option value='XDC' className='beautifulbtn'>XDC</option>
                        <option value='ECOIN' className='beautifulbtn'>ECOIN</option>                    
                    </select>
                    <label>Amount</label>
                    <input type='number' id='amount' required className='beautifulbtn'/>
                    <button type='submit' className='beautifulbtn'>Deposit</button>
                                        
                </form>
            </div>
            {isOpen && <Popup
        content={<>
        <b>Alert</b>
        <p>{message}</p>
        <button onClick={()=>{window.open(`/vault/access/${id}`, '_self')}}>Close</button>
      </>}
      handleClose={togglePopup}
    />}
         </Fragment>


    )
   
    }


export default VaultDeposit;