import React, { Fragment, useEffect, useState } from 'react';
import { getUserVault } from '../../services/cdpServices';
import ContractAddresses from '../ContractsData/ContractAddresses.json';
import ContractABIs from '../ContractsData/ContractABIs.json';
import { ContractFactory, ethers } from 'ethers';


const VaultFree = () => {
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
         window.open('/vault/access', '_self');
     }
     

/*      if (uservault.uservault.scm != 0 ) {
         window.alert("You can't get your collateral untill you clear your debt");
         window.open('/vault/access', '_self');

     } */
    
     const handleSubmit = async (e) => {
         e.preventDefault()
         const amount = uservault.uservault.debt;
         console.log(amount);
             const netid = await provider.getNetwork()
             if (netid.chainId == 51) {
                try {
                const signer = provider.getSigner();
                const accounts = await signer.getAddress();
              
               
                const vaultinstance = new ethers.Contract(
                    ContractAddresses.cdp,
                    ContractABIs.cdp,
                    signer
                );
                
                /* global BigInt */
                if (uservault.uservault.tax != 0 ) {
                    window.alert('Please Pay the debt before requesting the collateral back')
                    window.open('/vault/access', '_self');
               }

                    if (uservault.uservault.collateralX != 0) {
                    const payback = await vaultinstance.freeXDC(uservault.uservault.ino);
                    const receipt = await payback.wait();
                    if (receipt.status == true) {
                        window.alert( "XDC have been transferred to your account")
                        } else {console.log(receipt)} 
                    }

                    if (uservault.uservault.collateralE != 0) {
                        const payback = await vaultinstance.freeEcoins(uservault.uservault.ino);
                        const receipt = await payback.wait();
                    if (receipt.status == true) {
                        window.alert( "Ecoins have been transferred to your Account")
                        window.open('/vault/access', '_self')
                        } else {console.log(receipt)} 
                    }
                    else {
                        window.alert('You have no debt left');
                        window.open('/vault/access', '_self')

                    }
            
                } catch (err) {console.log(err)}
                } else {window.alert("Change Your Network to Apothem")}
            
                
         }
         
     
    
     return(
         <Fragment>
            <div className='depositform'>
                <form className='depositform-form' onSubmit={handleSubmit}>
                    <label>Get Your Collateral Back</label>
                   
                    <button type='submit'>Request</button>
                                        
                </form>
            </div>
         </Fragment>


    )
   
    }


export default VaultFree;