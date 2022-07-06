import React, { Fragment, useEffect, useState } from 'react';
import { getUserVault } from '../../services/cdpServices';
import ContractAddresses from '../ContractsData/ContractAddresses.json';
import ContractABIs from '../ContractsData/ContractABIs.json';
import { ethers } from 'ethers';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router';
const VaultAccess = () => {
    const { id } = useParams();
    let displayvault = false;
    const userwallet= sessionStorage.getItem('wallet');
    const[uservault, setvault] = useState({
        collateralE: "0",
        collateralX: "0",
        debt: "0",
        tax: "0",
        ino: "00000"
    });
    const [colprice, setcprice] = useState('0');

    const getcolprice = async (cole, colx)=>{
        try{
        var ecp = await axios.get('https://boiling-taiga-83466.herokuapp.com/https://api.probit.com/api/exchange/v1/ticker?market_ids=ECOIN-USDT');
        var xcp = await axios.get('https://boiling-taiga-83466.herokuapp.com/https://api.probit.com/api/exchange/v1/ticker?market_ids=XDC-USDT');
        var ecp = ecp.data.data[0].last;
        var xcp = xcp.data.data[0].last;
        var col = (cole/10**10)* ecp + (colx/10**18)* xcp;
        setcprice(col);
        displayvault = true;

        console.log(col);
        }catch(err){console.log(err)}
    };

    const vaultcheck = async () => {
       const uservault = await getUserVault(userwallet);
       console.log(uservault);
       setvault(uservault.uservault[id]);
       getcolprice(uservault.uservault[id].collateralE, uservault.uservault[id].collateralX);
    };

    useEffect(()=>{
        vaultcheck()
    },[]);

 return(
     <div className='vaultaccessnew'>
         <div className='vanhead'>Configure Your UNIDAO Vault</div>
         <div className='vaninsight'>VaultId <span className='vanisightbold'>{'0x....'+uservault.ino.slice(-3)}</span> | Stability Fee <span className='vanisightbold'>2%</span> | Liquidation Fee <span className='vanisightbold'>2%</span> |{/*  Min. Col Ratio <span className='vanisightbold'>175%</span> | */} Dust Limit <span className='vanisightbold'>$5000</span> </div>
         <div className='vanmaingrid'>
             <div className='vanmain4box'>
                 
             <div className='van1box'>
                 <div className='van1box1'>Current Price</div>
                     <div className='van1box2'>${Math.round(colprice)}</div>
                 </div>
                 <div className='van1box'> 
                 <div className='van1box1'>Collateralization Ratio</div>
                     <div className='van1box2'>500%</div>
                     <div className='van1box1'>Safety Ratio</div>
                     <div className='van1box2'>175%</div>
                 </div>
                 
              
                 <div className='van1box'>
                     <div className='van1box1'>Liquidation Price</div>
                     <div className='van1box2'>${Math.round((colprice)/1.75)}</div>
                     <div className='van1box3'></div>                      

                 </div>
                 
                 <div className='van1box'>
                 <div className='van1box1'>Collateral Locked</div>
                    <div className='van1box2'>ECOIN: {Math.round(uservault.collateralE/10**10)}</div>
                    <div className='van1box2'>XDC: {Math.round(uservault.collateralX/10**18)}</div>
                 </div>
             </div>
             <div className='vanmainconfig'>
                 <div className='vanmainconfig1'>Configure your Vault</div>
                 <div className='vanmainconfig2'>Simulate your vault by configuring the amount of collateral to deposit, and XUSD to generate.</div>
                 <div className='vanmainconfig3'>Deposit ECOIN</div>
                 <input className='vanmainconfig4' type={'number'}></input>
                 <div className='vanmainconfig5'></div>

             </div>
             <div className='vanmainlast'></div>
         </div>
         
     </div>
 )
 

  
 
  
    }


export default VaultAccess;