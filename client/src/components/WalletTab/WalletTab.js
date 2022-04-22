import React, { Fragment, useEffect, useState } from "react";
import { ethers } from "ethers";
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
            /* const provider = new ethers.providers.Web3Provider(window.ethereum);
            const netid = await provider.getNetwork() */
            if (chainId==51) {
            /* const signer = provider.getSigner(); 
            const accounts = await signer.getAddress();  */
            console.log(accounts[0])
            setstatus('Connected');
            setaddress(accounts[0]);
            sessionStorage.setItem('wallet', accounts[0]);
            } else {
                window.alert('Please change Network to Apothem')

            }
        

        }  catch(err){window.alert("Please Unlock Your Wallet")}
        } else {
            // Show alert if Ethereum provider is not detected
            window.alert("Please install XDCPay");
        }
    };
    const connectWalletHandler = async () => {
        try  {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const netid = await provider.getNetwork()
        if (netid.chainId ==51) {
        const signer = provider.getSigner(); 
        const accounts = await signer.getAddress();
            if (accounts.length !== 0) {
          console.log("Found an authorized account: ",provider);
          console.log(accounts)
            setstatus('Connected');
            setaddress(accounts);
            sessionStorage.setItem('wallet', accounts);
        } else {
          console.log("No authorized account found");
        } } else {
          window.alert("Set Your Network RPC to Apothem XDC Testnet")
        }
      }
        catch(err){window.alert("Unlock Your Wallet")}
      
      }
    return(
        <Fragment>
            <div className="wallettab">
                <div className="Walletaddress">
                    {/* <p>{ address}</p> */}
                </div>
                <div className="connectwallet">
                    <button onClick={()=>{connectWalletHandler()}} style={{
                            color: 'rgb(29, 171, 152)',
                            background: 'rgba(255, 255, 255, 0.08)',
                            border: 'none',
                            borderRadius: '10px',
                            height: '40px',
                            width: '81px'
                        }} >{walletstatus}</button>
                </div>
                    
             </div>
            
             
         

        </Fragment>
    )

}
export default WalletTab;