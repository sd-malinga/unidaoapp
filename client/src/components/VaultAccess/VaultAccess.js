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

 return(
     <div className='vaultaccessnew'>
         <div className='vanhead'>Configure Your UNIDAO Vault</div>
         <div className='vaninsight'>Insights | Insights | Insights | Insights | Insights </div>
         <div className='vanmaingrid'>
             <div className='vanmain4box'>
                 <div className='van1box'>                     
                 </div>
                 
                 <div className='van1box'>                     
                 </div>
                 
                 <div className='van1box'>                     
                 </div>
                 
                 <div className='van1box'>                     
                 </div>
             </div>
             <div className='vanmainconfig'></div>
             <div className='vanmainlast'></div>
         </div>
         
     </div>
 )
 

  
 
  
    }


export default VaultAccess;