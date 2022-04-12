import React, { Fragment, useEffect, useState } from 'react';
import { getUserVault } from '../../services/cdpServices';
import ContractAddresses from '../ContractsData/ContractAddresses.json';
import ContractABIs from '../ContractsData/ContractABIs.json';
import { ContractFactory, ethers } from 'ethers';
import Popup from '../Popup';
import { useParams } from 'react-router';
import { checklqvbalance, checklqvrates } from '../../services/lqvServices';

const S2X = ()=>{
    
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
        

    }
    useState(async()=>{
        await initdata()
    },[]);
    console.log(lqvbal);

    console.log(lqvrates);

    const exchangefunc = async () => {
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

            const flipx = await lqvInstance.functions.bustXDC(BigInt(amtx*10**18));
            console.log(flipx);
            const cop = await flipx.wait();
            if (cop.status==true){
            window.alert('Done')
            window.open('/liquidations/s2x', '_self')
            }
            /* globals BigInt */
            } catch(err){window.alert('Try Again')}
        } else {window.alert('Please Connect to Apothem Network')}
    }
    const exch1 = async () => {
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
            } catch(err){window.alert('Try Again')}
        } else {window.alert('Please Connect to Apothem Network')}
    }
return(
    <Fragment>
        <div className='maincontent'>
            <div className='adminpanelcol'>
            <h2>
                Exchange XUSD to XDC
            </h2>
            <h3>
            Current Exchange Rate: 1 XUSD = {lqvrates.s2x/10**18} XDC
            </h3>
            <h3>
            Available XDC to Exchange =  {lqvbal.xdc/10**18} XDC
            </h3>
            <div className="adminpanelopgrid">
                <div>Exchnage XUSD</div>
                <input type='number' id='xusdamt' style={{width: '200px', fontSize: '16px'}} placeholder='Enter Amount in XUSD' className='beautifulbtn'/>
                <button type='submit' className='beautifulbtn' onClick={exch1}>Exchange</button>
            </div>
            </div>

        </div>
    </Fragment>
)
};
export default S2X;