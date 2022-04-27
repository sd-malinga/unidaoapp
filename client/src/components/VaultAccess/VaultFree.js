import React, { Fragment, useEffect, useState } from 'react';
import { getUserVault } from '../../services/cdpServices';
import ContractAddresses from '../ContractsData/ContractAddresses.json';
import ContractABIs from '../ContractsData/ContractABIs.json';
import { ContractFactory, ethers } from 'ethers';
import Popup from '../Popup';
import { useParams } from 'react-router';


const VaultFree = () => {
const { id } = useParams()
      
const [isOpen, setIsOpen] = useState(false);
const [trxopen, settrx] = useState(false);
const togglePopup2 = () => {
   settrx(!trxopen);
 }
const togglePopup = () => {
  setIsOpen(!isOpen);
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
         window.open(`/vault/access/${id}`, '_self');
     }
     

/*      if (uservault.uservault[id].scm != 0 ) {
         window.alert("You can't get your collateral untill you clear your debt");
         window.open('/vault/access', '_self');

     } */
    
     const handleSubmit = async (e) => {
         e.preventDefault();
         togglePopup2()
         const amount = uservault.uservault[id].debt;
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
                if (uservault.uservault[id].tax != 0 ) {
                   setmessage('Please Pay the debt before requesting the collateral back')
                   togglePopup2()
                    togglePopup();
               }

                    if (uservault.uservault[id].collateralX != 0) {
                    const payback = await vaultinstance.freeXDC(uservault.uservault[id].ino);
                    const receipt = await payback.wait();
                    if (receipt.status == true) {
                        setmessage((uservault.uservault[id].collateralX/10**18) +" XDC have been transferred to your account");
                        settrx(false)

                        togglePopup();
                        } else {console.log(receipt)} 
                    }

                    if (uservault.uservault[id].collateralE != 0) {
                        const payback = await vaultinstance.freeEcoins(uservault.uservault[id].ino);
                        const receipt = await payback.wait();
                    if (receipt.status == true) {
                        settrx(false)

                        setmessage(uservault.uservault[id].collateralE/10**10, "Ecoins have been transferred to your Account")
                        togglePopup();
                        } else {console.log(receipt)} 
                    }
                    else {
                        //window.alert('You have no debt left');
                       // window.open('/vault/access', '_self')

                    }
            
                } catch (err) {console.log(err)}
                } else {window.alert("Change Your Network to Apothem")}
            
                
         }
         
         const vaultdetail= ()=>{
             console.log(uservault)
             if (uservault != 'Checking'){
             return(
                <>
                <div className='vaultdetails'>
                {/* <p>Owner: {uservault.uservault[id].owner}</p> */}
                <p>Locked XDC: {(uservault.uservault[id].collateralX)/10**18}</p>
                <p>Locked ECOIN: {(uservault.uservault[id].collateralE)/10**10}</p>
                
             </div>
             <div className='depositform'>
             <form className='depositform-form' onSubmit={handleSubmit}>
                 <label>Wipe Your Vault</label>
                
                 <button type='submit' className='beautifulbtn'>Pay Back</button>
                                     
             </form>
         </div>
         </>
             )}
             else if(uservault=='Checking') {
                 console.log('chckavi')
                 return(
                <>
        
                <p>Loading Collateral Details</p>
                <img src={'/loading.gif'} height={'150px'} width={'150px'} />
        
              </>        
                 )}
         }
     
    
     return(
         <Fragment>
            <Fragment>
                
                {vaultdetail()}
            </Fragment>
            <Fragment>
               
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
         </Fragment>

    )
   
    }


export default VaultFree;