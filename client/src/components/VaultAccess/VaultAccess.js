import React, { Fragment, useEffect, useState } from 'react';
import { getUserVault } from '../../services/cdpServices';
import ContractAddresses from '../ContractsData/ContractAddresses.json';
import ContractABIs from '../ContractsData/ContractABIs.json';
import { ethers } from 'ethers';
import { Link } from 'react-router-dom';

const VaultAccess = () => {
    
    const userwallet= sessionStorage.getItem('wallet');
    const[uservault, setvault] = useState('');
    
    const vaultcheck = async () => {
       const uservault = await getUserVault(userwallet);
       console.log(uservault);
       setvault(uservault)
    };

    useEffect(()=>{
        vaultcheck()
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
            } catch(err){window.alert('Try Again')}
        } else {window.alert('Please Connect to Apothem Network')}
    }

    const vaultdetails = ()=>{
            return (
                <Fragment>
                   <div className='vaultdetails'>
                    <p>Cup No: {uservault.uservault.ino}</p>
                    <p>Owner: {uservault.uservault.owner}</p>
                    <p>Ecoin Balance: {(uservault.uservault.collateralE)/10**10}</p>
                    <p>XDC Balance: {(uservault.uservault.collateralX)/10**18}</p>
                    <p>Stablecoin Minted: {(uservault.uservault.scm)/10**18}</p>
                    <p>Debt: {(uservault.uservault.debt)/10**18}</p>
                    <p>Tax: {(uservault.uservault.tax/10**18)}</p>

                    <div className='vaultoptions'>
                    <Link to='/vault/deposit' className='linkbtn'>Deposit Collateral</Link>
                    <Link to='/vault/payback' className='linkbtn'>Pay Back</Link>
                    <Link to='/vault/getcollateral' className='linkbtn'>Get Collateral</Link>
                    </div>

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
                    <button className='openvaultbtn' onClick={()=>{openvault()}}>Open A Vault</button>
                </div>
            </Fragment>

        )
    } else if (uservault ==""){
        return(
            <p>Please Wait</p>
        )

    }
         else {
             return vaultdetails()
         }
    }

    return(
            <Fragment>
                <div className='vaultcontent'>
                    <h3>Your Vault Details</h3> 
                        {vcrender()}
                   
                    </div>
                   
                
            </Fragment>
    );
  
    }


export default VaultAccess;