import React, { Fragment, useEffect, useState } from "react";
import { getxdcbalance, gettaxrate } from "../../services/cdpServices";
import { getEcoinBalanceOf } from "../../services/ecoinServices";
import { getTotalSupply } from "../../services/scServices";
import contractaddresses from '../../components/ContractsData/ContractAddresses.json';
const Home = ()=> {
const [taxrate, settaxrate]= useState('');
const [totalsupply, settotalsupply] = useState('');
const [xdctvl, setxdctvl] = useState('');
const[ecointvl, setecointvl] = useState("");
useEffect(()=>{
 const balancecheck = async () =>{
    const baldata = await  getxdcbalance();
    console.log(baldata);
    setxdctvl(baldata.vaultbal);
    const ebaldata = await getEcoinBalanceOf(contractaddresses.cdp);
    setecointvl(ebaldata.ecoinbalance);
    const taxrateis = await gettaxrate();
    settaxrate(taxrateis.taxrate);
    const totalsupplyis = await getTotalSupply();
    settotalsupply(totalsupplyis.totalSupply);
 };
 balancecheck();
}, [])
 
    return(
        <Fragment>
            <div className="mainapp">
                <h1>Welcome to UniDAO</h1> 
                <div className="glosarry">
                    <h3 style={{alignSelf: 'center'}}>UniDAO at a glance</h3>  
                    <strong>Total Locked Value (XDC): {(xdctvl)/10**18}</strong>   
                    <strong>Total Locked Value (Ecoin): {(ecointvl)/10**10}</strong>           
                    <strong>Total XUSD Supply: {(totalsupply)/10**18}</strong>           
                    <strong>Current Tax Rate: {taxrate}%</strong>  
                             

                </div>            
            </div>

        </Fragment>
    )

}
export default Home