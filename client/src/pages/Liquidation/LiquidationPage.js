import React, { Fragment, useEffect, useState } from "react";
import contractaddresses from '../../components/ContractsData/ContractAddresses.json';
import { ethers } from "ethers";
import ContractAddresses from '../../components/ContractsData/ContractAddresses.json';
import ContractABIs from '../../components/ContractsData/ContractABIs.json';
import Web3 from "web3";
import { checklqvbalance, checklqvrates } from '../../services/lqvServices';

const LiquidationPage = ()=>{

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
return(
    <Fragment>
        <div className='maincontent'>
            <h2>Welcome to UNIDAO Liquidations</h2>
            <div className='maincontent'>
                <h3>Liquidation Vault Volume</h3>
                <div className="lmpd1">
                    <div>
                        XDC 
                    </div>
                    <div>
                        {lqvbal.xdc/10**18}
                    </div>
                </div>

                <div className="lmpd1">
                    <div>
                        Ecoin 
                    </div>
                    <div>
                        {lqvbal.ecoin/10**10}
                    </div>
                </div>

                <div className="lmpd1">
                    <div>
                        XUSD 
                    </div>
                    <div>
                        {lqvbal.sc/10**18}
                    </div>
                </div>
            </div>

            <div className='maincontent'>
                <h3>Liquidation Vault Exchange Rates</h3>
                <div className="lmpd1">
                    <div>
                        1 XDC
                    </div>
                    <div>
                        {lqvrates.x2s/10**18} XUSD
                    </div>
                </div>

                <div className="lmpd1">
                    <div>
                       1 Ecoin
                    </div>
                    <div>
                        {lqvrates.e2s/10**18} XUSD
                    </div>
                </div>

                <div className="lmpd1">
                    <div>
                       1 XUSD
                    </div>
                    <div>
                        {lqvrates.s2x/10**18} XDC
                    </div>
                </div>
                <div className="lmpd1">
                    <div>
                        1 XUSD  
                    </div>
                    <div>
                        {lqvrates.s2e/10**10} Ecoins
                    </div>
                </div>
            </div>

            <div style={{display: 'flex', flexDirection: 'row' , gap: '30px', marginTop: '100px'}}>
                <button className="beautifulbtn" onClick={()=>{window.open('/liquidations/s2x', '_self')}}>
                    Exchange XUSD to XDC
                </button>
                <button className="beautifulbtn" onClick={()=>{window.open('/liquidations/s2e', '_self')}}>
                    Exchange XUSD to ECOIN
                </button>
            </div>
        </div>
    </Fragment>
    
)

}
export default LiquidationPage