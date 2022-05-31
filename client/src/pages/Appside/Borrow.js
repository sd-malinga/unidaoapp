import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import Header from '../../components/Header/Header';
import ConnectWalletButton from "../../components/ConnectWalletButton/ConnectWalletButton";
import EcoinBorrow from "../../components/BorrowOption/EcoinBorrow";
import XDCBorrow from "../../components/BorrowOption/XDCBorrow";
const Borrow = ()=> {
    

    return(
        <Fragment>
            <div className="apphome">
                <div className="apphomecontent">
                    <h1 className="contentheading">UNIDAO Borrow</h1>
                    <div className="contentcontent">
                    Borrow XUSD against your favorite XDC or ECOIN. Use the XUSD however you like. Browse the featured, or select an asset to view our products.
                   </div>
             
                    <div className="connectapphome">
                        {(()=>{
                            if(sessionStorage.getItem('wallet') == null) return(
                                <ConnectWalletButton style={'dark'} />
                            )
                        })()}
                    </div>
                   
                    <div className="connectapphome" style={{gap: '50px', width: 'max-content'}}>

                    <EcoinBorrow />
                    <XDCBorrow />

                    </div>
                </div>



           

           
             
            </div>

        </Fragment>
    )

}
export default Borrow;