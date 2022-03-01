import React, { Fragment } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    
  } from "react-router-dom";
 import WalletTab from "../../components/WalletTab/WalletTab";
 import Vault from '../Vault/Vault';
 import Home from "../Home/Home";
const Appside = ()=> {

    return(
        <Fragment>
            <div className="appside">
               <WalletTab />
                <Switch>
                        <Route exact path='/' component={Home}/>
                            

                        <Route path='/vault' component={Vault} />
                           
                        
                        
                    </Switch>
             
            </div>

        </Fragment>
    )

}
export default Appside;