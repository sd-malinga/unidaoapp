import React, { Fragment, useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import ProtectedRoute from '../../components/ProtectedRoute/ProtectedRoute';
import VaultAccess from '../../components/VaultAccess/VaultAccess';
import VaultDeposit from '../../components/VaultAccess/VaultDeposit';
import VaultPayback from '../../components/VaultAccess/VaultPayback';
import VaultFree from '../../components/VaultAccess/VaultFree';
import { getUserVault } from '../../services/cdpServices';
import ContractABIs from '../../components/ContractsData/ContractABIs.json';
import ContractAddresses from '../../components/ContractsData/ContractAddresses.json';
import { ethers } from 'ethers';
const Vault = () => {
    const [uservault, setvault] = useState('')
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
            uservault.map((item, idx)=>{
                return(
            <button className='beautifulbtn' onClick={()=>{entervault(idx)}}>Access Vault {idx +1}</button>
            )})
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
            <p>Please Wait</p>
        )

    }
         else {
             return vaultdetails()
         }
    }

    return(
            <Fragment>
                <div className='maincontent'>
                    <h3>Welcome to UNIDAO Vaults</h3>    

                   
                    <Switch>
                      <Route exact path='/vault' >
                      {vcrender()}

                     </Route>

                      <ProtectedRoute path='/vault/access/:id' component={VaultAccess} />
                      
                      <ProtectedRoute path='/vault/deposit/:id' component={VaultDeposit} />
    
                      <ProtectedRoute path='/vault/payback/:id' component={VaultPayback} />
                      <ProtectedRoute path='/vault/getcollateral/:id' component={VaultFree} />
                    </Switch>
                    
                    </div>
                
            </Fragment>
    );
    }


export default Vault;