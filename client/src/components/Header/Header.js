import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { Link } from  'react-router-dom'
import { useHistory } from 'react-router-dom';
 import { ethers } from "ethers";
 import ConnectWalletButton from '../ConnectWalletButton/ConnectWalletButton';
const Header = ()=> {
    const {
        location: { pathname },
      } = useHistory();
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
                <div className="apphome_header">
                    <div className='logodivsb'>
                    <Link to='/'>
                    <div className="appheaderlogo"></div>
                    </Link>
                    <Link to='/' style={{textDecoration: 'none', color: 'black'}}>
                    <div>
                        Stake
                    </div>
                    </Link>
                    <Link to= '/borrow' style={{textDecoration: 'none', color: 'black',     fontWeight: pathname === '/borrow' ? '1000' : '400' }}>
                    <div>
                        Borrow
                    </div>
                    </Link>
                    </div>
                    <div className="appheaderbtn">
                        <ConnectWalletButton style={'white'} />
                   
                    </div>
                </div>   
            
        </Fragment>
    )

}
export default Header;