import React, { Fragment, useEffect, useState } from 'react';
import { getUserVault } from '../../services/cdpServices';
import ContractAddresses from '../ContractsData/ContractAddresses.json';
import ContractABIs from '../ContractsData/ContractABIs.json';
import { ContractFactory, ethers } from 'ethers';
import Popup from '../Popup';
import { useParams } from 'react-router';
import { checklqvbalance, checklqvrates } from '../../services/lqvServices';

const S2E = ()=>{
     
const [isOpen, setIsOpen] = useState(false);
const [trxopen, settrx] = useState(false);
const [message, setmessage]= useState('');
const togglePopup2 = () => {
   settrx(!trxopen);
 }
const togglePopup = () => {
  setIsOpen(!isOpen);
}
const [loading, setloading] = useState(false);


    
    const [lqvbal, setlqvbal] = useState(
        {
        ecoin: '0',
        xdc: '0',
        sc: '0'
        });
    
    const [lqvrates, setlqvrates] = useState({
        s2e: '0',
        s2x: '0',
        e2s: '0',
        x2s: '0'
        })

    const initdata = async ()=>{
        const lqvbalance = await checklqvbalance();
        setlqvbal(lqvbalance)

        const lqvrate = await checklqvrates();
        setlqvrates(lqvrate);
        setloading(true);


    }
    useState(async()=>{
        await initdata()
    },[]);
    console.log(lqvbal);

    console.log(lqvrates);

    const exchangefunc = async () => {
        togglePopup2();

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const amtx = document.getElementById('xusdamt').value;
        const netid = await provider.getNetwork()
        
        if (netid.chainId == 51) {
            try{
            const signer = provider.getSigner();
            const accounts = await signer.getAddress();
            const lqvInstance = new ethers.Contract(
                ContractAddresses.lqv,
                ContractABIs.lqv,
                signer
            );
                        /* globals BigInt */

            const flipx = await lqvInstance.functions.bustEcoin(BigInt(amtx*10**18));
            console.log(flipx);
            const cop = await flipx.wait();
            if (cop.status==true){
                setmessage('You have successfull exchanged XUSD to ECOIN')
                settrx(false)
                togglePopup();
            }
            /* globals BigInt */
            } catch(err){settrx(false); setmessage('Please Try Again'); togglePopup();}
        } else {window.alert('Please Connect to Apothem Network')}
    }
    const exch1 = async () => {
        togglePopup2();

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const amtx = document.getElementById('xusdamt').value;
        const netid = await provider.getNetwork()
        
        if (netid.chainId == 51) {
            try{
            const signer = provider.getSigner();
            const accounts = await signer.getAddress();
            const scInstance = new ethers.Contract(
                ContractAddresses.sc,
                ContractABIs.sc,
                signer
            );
            /* globals BigInt */
            const approve = await scInstance.functions.approve(ContractAddresses.lqv, BigInt(amtx*10**18));
            console.log(approve);
            const cop = await approve.wait();
            if (cop.status==true){
   
            exchangefunc();
            }
            } catch(err){settrx(false); setmessage('Please Try Again'); togglePopup();}
        } else {window.alert('Please Connect to Apothem Network')}
    }
    if(loading==false){
        return(
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white'}}>
            <img src={'/loading.gif'} height={'150px'} width={'150px'} />
        </div>
        )
    } else{
return(
    <Fragment>
        <div className='maincontent'>
            <div className='adminpanelcol'>
            <h2>
                Exchange XUSD to ECOIN
            </h2>
            <h3>
            Current Exchange Rate: 1 XUSD = {lqvrates.s2e/10**10} Ecoins
            </h3>
            <h3>
            Available Ecoins to Exchange =  {lqvbal.ecoin/10**10} Ecoins
            </h3>
            <div className="adminpanelopgrid">
                <div>Exchange XUSD</div>
                <input type='number' id='xusdamt' style={{width: '200px', fontSize: '16px'}} placeholder='Enter Amount in XUSD' className='beautifulbtn'/>
                <button type='submit' className='beautifulbtn' onClick={exch1}>Exchange</button>
            </div>
            </div>

        </div>
        <Fragment>
               
               {isOpen && <Popup
       content={<>
       <b>Alert</b>
       <p>{message}</p>
       <button className='beautifulbtn' style={{padding: '10px'}} onClick={()=>{window.open(`/home`, '_self')}}>Close</button>
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
)}
};
export default S2E;