import React, { Fragment, useEffect, useState } from "react";
import contractaddresses from '../../components/ContractsData/ContractAddresses.json';
import { ethers } from "ethers";
import ContractAddresses from '../../components/ContractsData/ContractAddresses.json';
import ContractABIs from '../../components/ContractsData/ContractABIs.json';
import Web3 from "web3";

const AdminPage = ()=>{

    const setmsr = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const inp = document.getElementById('msr').value;
        const netid = await provider.getNetwork()
        
        if (netid.chainId == 51) {
            try{
            const signer = provider.getSigner();
            const accounts = await signer.getAddress();
            const admininstance = new ethers.Contract(
                ContractAddresses.admin,
                ContractABIs.admin,
                signer
            );
            const set = await admininstance.functions.setMCR(inp);
            console.log(set);
            const cop = await set.wait();
            window.alert('Minimum Safety Ratio is Set to: '+ inp+ '%')

            } catch(err){window.alert('Try Again')}

        } else {window.alert('Please Connect to Apothem Network')}
    }
    const setocr = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const inp = document.getElementById('ocr').value;
        const netid = await provider.getNetwork()
        
        if (netid.chainId == 51) {
            try{
            const signer = provider.getSigner();
            const accounts = await signer.getAddress();
            const admininstance = new ethers.Contract(
                ContractAddresses.admin,
                ContractABIs.admin,
                signer
            );
            const set = await admininstance.functions.setOCR(inp);
            console.log(set);
            const cop = await set.wait();
            window.alert('Over Collaterization Ratio is Set to: '+ inp +'%')
            } catch(err){window.alert('Try Again')}
        } else {window.alert('Please Connect to Apothem Network')}
    }
    const setsf = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const inp = document.getElementById('sf').value;
        const netid = await provider.getNetwork()
        
        if (netid.chainId == 51) {
            try{
            const signer = provider.getSigner();
            const accounts = await signer.getAddress();
            const admininstance = new ethers.Contract(
                ContractAddresses.admin,
                ContractABIs.admin,
                signer
            );
            const set = await admininstance.functions.setStabilityFee(inp);
            console.log(set);
            const cop = await set.wait();
            } catch(err){window.alert('Try Again')}
            window.alert('Stability Fees is set to: '+ inp +'%')

        } else {window.alert('Please Connect to Apothem Network')}
    }
return(
    <div className='maincontent'>
        <h3>Welcome to UNIDAO Admin Panel</h3>
        <div className="adminpanelcol">
            <div className="adminpanelopgrid">
                <div className="apogd1">Set Stability Fee</div>
                <input type='number' id='sf' style={{width: '200px'}} className='beautifulbtn'/>
                <button type='submit' className='beautifulbtn' onClick={setsf}>Set</button>
            </div>
            <div className="adminpanelopgrid">
                <div className="apogd1">Set Over Collateralization Ratio</div>
                <input type='number' id='ocr' style={{width: '200px'}} className='beautifulbtn'/>
                <button type='submit' className='beautifulbtn' onClick={setocr}>Set</button>
            </div>
            <div className="adminpanelopgrid">
                <div className="apogd1">Set Minimum Safety Ratio</div>
                <input type='number' id='msr' style={{width: '200px'}}  className='beautifulbtn'/>
                <button type='submit' className='beautifulbtn' onClick={setmsr}>Set</button>
            </div>
        </div>      
    </div>
)
}
export default AdminPage