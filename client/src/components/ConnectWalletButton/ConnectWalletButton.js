import react from 'react';
import { useState, useEffect } from "react";

import { ethers } from "ethers";

const ConnectWalletButton = ({style}) =>{
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
<>
        {(()=>{
            if(walletstatus=='Connected') {return(
                <button className={'connectwalletbutton_'+style} onClick={connectWallet}>

                Connected
                </button>
            );

            }else {
                return(
                    <button className={'connectwalletbutton_'+style} onClick={connectWallet}>
                Connect Wallet
                <img src={style=='white' ? '/assets/arrow.svg' : '/assets/arrowwhite.svg'} />
            
                    </button>
                )
            }
        })()}
  </>    
)
}

export default ConnectWalletButton;