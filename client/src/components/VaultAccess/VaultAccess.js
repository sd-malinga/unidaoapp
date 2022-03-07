import React, { Fragment, useEffect, useState } from 'react';
import { getUserVault } from '../../services/cdpServices';
import ContractAddresses from '../ContractsData/ContractAddresses.json';
import ContractABIs from '../ContractsData/ContractABIs.json';
import { ethers } from 'ethers';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
const VaultAccess = () => {
    const { id } = useParams();
    
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
            const cop = await VaultOpen.wait();
            window.open(`/vault/access/${id}`, '_self')
            } catch(err){window.alert('Try Again')}
        } else {window.alert('Please Connect to Apothem Network')}
    }

    const vaultdetails = ()=>{
            return (
                <Fragment>
                   <div className='vaultdetails'>
                    
                    <p>Vault ID: x{uservault.uservault[id].ino.slice(-4)}</p>
                    <p>Locked XDC: {(uservault.uservault[id].collateralX)/10**18}</p>
                    <p>Locked ECOIN: {(uservault.uservault[id].collateralE)/10**10}</p>
                    <div className='vaultoptions'>
                    
                    <button onClick={()=>{window.open(`/vault/deposit/${id}`, '_self')}}  className='beautifulbtn'>Deposit Collateral</button>
                    <button onClick={()=>{window.open(`/vault/payback/${id}`, '_self')}} className='beautifulbtn'>Pay Back</button>
                    <button onClick={()=>{window.open(`/vault/getcollateral/${id}`, '_self')}} className='beautifulbtn'>Get Collateral</button>
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
                    <button className=' beautifulbtn' onClick={()=>{openvault()}}>Open A Vault</button>
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