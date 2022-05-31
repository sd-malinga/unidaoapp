import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import Header from '../../components/Header/Header';
import ConnectWalletButton from "../../components/ConnectWalletButton/ConnectWalletButton";
const AppHome = ()=> {
    

    return(
        <Fragment>
            <div className="apphome">
                <div className="apphomecontent">
                    <h1 className="contentheading">UNIDAO - World’s Best Stablecoin</h1>
                    <div className="contentcontent">
                    UNIDAO combines the best decentralization and stability of stablecoins using an innovative & best-in-the-class design for stable-coins.
                    UNIDAO is totally focused on mass adoption,
                    Our vision is to reach countries with very high demand for stable coins first like Lebanon, Nigeria, Turkey, Argentina etc.
                    Combined with lowest transfer fees and our partnerships with established ecosystems, UNIDAO aims to cross 1 Million
                    </div>
                  {/*   <div className="connectapphome">
                        <button style={{
                            color: 'rgb(29, 171, 152)',
                            background: 'rgba(255, 255, 255, 0.08)',
                            border: 'none',
                            borderRadius: '10px',
                            height: '40px',
                            width: '81px'
                        }} onClick={()=>{window.open('/wpsite/index.html', '_self')}}>Learn More</button>
                        <button style={{
                            color: 'rgb(29, 171, 152)',
                            background: 'rgba(255, 255, 255, 0.08)',
                            border: 'none',
                            borderRadius: '10px',
                            height: '40px',
                            width: '81px'
                        }}>Reach Us</button>
                    </div> */}
                    <div className="connectapphome">
                        {(()=>{
                            if(sessionStorage.getItem('wallet') == null) return(
                                <ConnectWalletButton style={'dark'} />
                            )
                        })()}
                    </div>
                    <div className="connectapphome">
                    <div className="ecoinxdc" onClick={()=>{window.open('https://ecoinofficial.org')}}>
                        <img src='/assets/ecoinsmall.svg'/>
                        ECOIN
                    </div>
                    <div className="ecoinxdc" onClick={()=>{window.open('https://xinfin.org')}}>
                        <img src='/assets/xdcsmall.svg'/>
                        XDC
                    </div>
                    </div>
                </div>



           

           
             
            </div>

        </Fragment>
    )

}
export default AppHome;