import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    
  } from "react-router-dom";
 import { ethers } from "ethers";
const AppHome = ()=> {
    const [walletstatus, setstatus] = useState('Connect Wallet');
    const [address, setaddress] = useState('');

    function walletcheck() {
        if (sessionStorage.getItem('wallet') !== null) {
            setstatus("Connected");
            setaddress(sessionStorage.getItem('wallet'));
        }
    };
    useEffect(()=>{
    walletcheck();
    }, [])
    
    const connectWallet = async () => {
        // Check if MetaMask is installed on user's browser
        if(window.ethereum) {
            try{
            /* const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const chainId =  await window.ethereum.request({ method: 'eth_chainId'});
            console.log(accounts[0], chainId) */
             
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const netid = await provider.getNetwork();
            console.log(netid.chainId)
            if (netid.chainId==51) {
                const signer = provider.getSigner(); 
                const accounts = await signer.getAddress(); 
                console.log(accounts)
                setstatus('Connected');
                setaddress(accounts);
                sessionStorage.setItem('wallet', accounts);
                window.open('/home', '_self')
                } else {
                    window.alert('Please change Network to Apothem')
    
                }

        }  catch(err){window.alert("Please Unlock Your Wallet")}
        } else {
            // Show alert if Ethereum provider is not detected
            window.alert("Please install XDCPay");
        }
    };

    return(
        <Fragment>
            <div className="apphome">
                <div className="apphome_header">
                    <div className="appheaderlogo"></div>
                    <div className="appheaderbtn">
                        <button style={{
                            color: 'rgb(29, 171, 152)',
                            background: 'rgba(255, 255, 255, 0.08)',
                            border: 'none',
                            borderRadius: '10px',
                            height: '40px'
                        }} onClick={connectWallet}>Login Using Wallet</button>
                    </div>
                </div>
                <div className="apphomecontent">
                    <h1 className="contentheading">UNIDAO - The Best Stablecoin</h1>
                    <div className="contentcontent">
                    UNIDAO combines the best decentralization and stability of stablecoins using an innovative & best-in-the-class design for stable-coins.
                    UNIDAO is totally focused on mass adoption,
                    Our vision is to reach countries with very high demand for stable coins first like Lebanon, Nigeria, Turkey, Argentina etc.
                    Combined with lowest transfer fees and our partnerships with established ecosystems, UNIDAO aims to cross 1 Million
                    </div>
                    <div className="connectapphome">
                        <button style={{
                            color: 'rgb(29, 171, 152)',
                            background: 'rgba(255, 255, 255, 0.08)',
                            border: 'none',
                            borderRadius: '10px',
                            height: '40px',
                            width: '81px'
                        }} onClick={()=>{window.open('https://unidao.herokuapp.com')}}>Learn More</button>
                        <button style={{
                            color: 'rgb(29, 171, 152)',
                            background: 'rgba(255, 255, 255, 0.08)',
                            border: 'none',
                            borderRadius: '10px',
                            height: '40px',
                            width: '81px'
                        }}>Reach Us</button>
                    </div>
                </div>



           

           
             
            </div>

        </Fragment>
    )

}
export default AppHome;