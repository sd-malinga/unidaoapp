import React, { Fragment, useEffect, useState } from "react";
const WalletTab = ()=> {
    
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
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const chainId =  await window.ethereum.request({ method: 'eth_chainId'});
        console.log(accounts[0], chainId)
        setstatus('Connected');
        setaddress(accounts[0]);
        sessionStorage.setItem('wallet', accounts[0]);
            } catch(err){window.alert("Please Unlock Your Wallet")}
        } else {
            // Show alert if Ethereum provider is not detected
            window.alert("Please install MetaMask");
        }
    };
    
    return(
        <Fragment>
            <div className="wallettab">
                <div className="Walletaddress">
                    <p>{ address}</p>
                </div>
                <div className="connectwallet">
                    <button onClick={()=>{connectWallet()}}>{walletstatus}</button>
                </div>
                    
             </div>
            
             
         

        </Fragment>
    )

}
export default WalletTab;