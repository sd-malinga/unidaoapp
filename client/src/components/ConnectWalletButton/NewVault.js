import react from 'react';
import { useState, useEffect } from "react";

import { ethers } from "ethers";
import ContractABIs from '../ContractsData/ContractABIs.json';
import ContractAddresses from '../ContractsData/ContractAddresses.json';
const NewVaultButton = ({style}) =>{
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
return(
            
    
                <button className={'connectwalletbutton_'+style} onClick={openvault}>
                Open a New Vault
                {/* <img src={style=='white' ? '/assets/arrow.svg' : '/assets/arrowwhite.svg'} />
             */}
                </button>
                )


}

export default NewVaultButton;