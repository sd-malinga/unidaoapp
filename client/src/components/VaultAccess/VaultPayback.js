import React, { Fragment, useEffect, useState } from 'react';
import { getUserVault } from '../../services/cdpServices';
import ContractAddresses from '../ContractsData/ContractAddresses.json';
import ContractABIs from '../ContractsData/ContractABIs.json';
import {  ethers } from 'ethers';
import Popup from '../Popup';
import { useParams } from 'react-router';

const VaultPayback = () => {
    const [done, setdone] = useState('');
    const { id } = useParams();
const [isOpen, setIsOpen] = useState(false);
const [trxopen, settrx] = useState(false);
const togglePopup2 = () => {
   settrx(!trxopen);
 }
const togglePopup = () => {
  setIsOpen(!isOpen);
  if(done =='Done'){
      window.open(`/vault/access/${id}`, '_self'  )
  }
}
const[message, setmessage] = useState('')
    const userwallet= sessionStorage.getItem('wallet');
    const[uservault, setvault] = useState('Checking');

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
         const amount = uservault.uservault[id].debt;
         console.log(amount);
             const netid = await provider.getNetwork()
             if (netid.chainId == 51) {
                try {
                const signer = provider.getSigner();
                const accounts = await signer.getAddress();
                const govins = new ethers.Contract(
                    ContractAddresses.gov,
                    ContractABIs.gov,
                    signer
                );
                const scins = new ethers.Contract(
                    ContractAddresses.sc,
                    ContractABIs.sc,
                    signer
                );
                const vaultinstance = new ethers.Contract(
                    ContractAddresses.cdp,
                    ContractABIs.cdp,
                    signer
                );
                
                /* global BigInt */
                setmessage("You have to sign three transactions. 1. Approval of Gov Coin. 2. Approval of XUSD. 3. Pay back of debt")
                togglePopup()
                console.log(uservault.uservault[id].tax)
                const approve = await govins.approve(ContractAddresses.cdp, BigInt((uservault.uservault[id].tax)));
                const approve2 = await scins.approve(ContractAddresses.cdp, BigInt((amount)));
                setmessage('Kindly Wait for the Transactions to be successfull');
                togglePopup();
                const receipt2 = await approve.wait();
                const receipt3 = await approve2.wait();
                console.log(receipt2, receipt3)

                const payback = await vaultinstance.wipeVault(uservault.uservault[id].ino);
                setIsOpen(false);
                settrx(true)
                const receipt = await payback.wait();
              
                if (receipt.status == true) {
                    setdone('Done')
                    settrx(false);
                    togglePopup();
                    setmessage( "Debt is paid successfully")
                    togglePopup()
                } else {console.log(receipt)} 
            
                } catch (err) {console.log(err)}
                } else {window.alert("Change Your Network to Apothem")}
            
                
         }
         const vaultdetail= ()=>{
            if (uservault != 'Checking'){
            return(
                <>
               <div className='vaultdetails'>
               {/* <p>Owner: {uservault.uservault[id].owner}</p> */}
               <p>Debt: {(uservault.uservault[id].debt)/10**18} XUSD</p>
               <p>Stability Fees: {(uservault.uservault[id].tax)/10**18} UDAO</p>
               
            </div>
            <div className='depositform'>
            <form className='depositform-form' onSubmit={handleSubmit}>
                <label>Wipe Your Vault</label>
               
                <button type='submit' className='beautifulbtn'>Pay Back</button>
                                    
            </form>
        </div>
        </>
            )}
            else {
                return(
                    <>
        
        <p>Loading Debt Details</p>
        <img src={'/loading.gif'} height={'150px'} width={'150px'} />

      </>
                )
            }
        }
     
    
     return(
         <Fragment>
             {vaultdetail()}
          
            {isOpen && <Popup
        content={<>
        <b>Alert</b>
        <p>{message}</p>
        <button className='beautifulbtn' style={{padding: '10px'}} onClick={()=>{window.open(`/vault/access/${id}`, '_self')}}>Close</button>
      </>}
      handleClose={togglePopup}
    />}
     {trxopen && <Popup
        content={<>
        
        <p>Kindly Wait for the transaction to get complete</p>
        <img src={'/loading.gif'} height={'150px'} width={'150px'} />

      </>}
      handleClose={togglePopup2}
    />}
         </Fragment>


    )
   
    }


export default VaultPayback;