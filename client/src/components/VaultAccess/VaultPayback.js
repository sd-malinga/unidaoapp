import React, { Fragment, useEffect, useState } from 'react';
import { getUserVault } from '../../services/cdpServices';
import ContractAddresses from '../ContractsData/ContractAddresses.json';
import ContractABIs from '../ContractsData/ContractABIs.json';
import { ContractFactory, ethers } from 'ethers';


const VaultPayback = () => {
    const userwallet= sessionStorage.getItem('wallet');
    const[uservault, setvault] = useState('');

    const provider =  new ethers.providers.Web3Provider(window.ethereum);
    
   

    const vaultcheck = async () => {
        const uservault = await getUserVault(userwallet);
        console.log(uservault);
        setvault(uservault);
        };
 
     useEffect(()=>{
         vaultcheck()
     },[]);

     if (uservault ==='No Vault') {
         window.open('/vault/access', '_self')
     }
    
     const handleSubmit = async (e) => {
         e.preventDefault()
         const amount = uservault.uservault.debt;
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
                window.alert("You have to sign three transactions. 1. Approval of Gov Coin. 2. Approval of XUSD. 3. Pay back of debt")
                
                const approve = await govins.approve(ContractAddresses.cdp, BigInt((uservault.uservault.tax)));
                const approve2 = await scins.approve(ContractAddresses.cdp, BigInt((amount)));
                const receipt2 = await approve.wait();
                const receipt3 = await approve2.wait();

                console.log(receipt2, receipt3)

                const payback = await vaultinstance.wipeVault(uservault.uservault.ino);
                const receipt = await payback.wait();
                if (receipt.status == true) {
                    window.alert( (amount/10**18) + " Debt is paid successfully")
                    window.open('/vault/access', '_self')
                } else {console.log(receipt)} 
            
                } catch (err) {console.log(err)}
                } else {window.alert("Change Your Network to Apothem")}
            
                
         }
         
     
    
     return(
         <Fragment>
            <div className='depositform'>
                <form className='depositform-form' onSubmit={handleSubmit}>
                    <label>Wipe Your Vault</label>
                   
                    <button type='submit'>Pay Back</button>
                                        
                </form>
            </div>
         </Fragment>


    )
   
    }


export default VaultPayback;