import React, { Fragment } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    
  } from "react-router-dom";
 import WalletTab from "../../components/WalletTab/WalletTab";
 import Vault from '../Vault/Vault';
 import Home from "../Home/Home";
 import AppHome from "./AppHome";
const Appside = ()=> {

    return(
        <Fragment>
            <div className="appside">
               <WalletTab />
                <Switch>
                        
                        <Route  path='/home' component={Home}/>
                            

                        <Route path='/vault' component={Vault} />
                           
                        
                        
                </Switch>
             
            </div>

        </Fragment>
    )

}
export default Appside;