import React, { Fragment } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    
  } from "react-router-dom";
  import AdminPage from '../Admin/AdminPage'
 import WalletTab from "../../components/WalletTab/WalletTab";
 import Vault from '../Vault/Vault';
 import Home from "../Home/Home";
 import AppHome from "./AppHome";
 import Header from "../../components/Header/Header";
 import LiquidationPage from "../Liquidation/LiquidationPage";
 import S2X from "../../components/LiquidationExchange/S2X";
 import S2E from "../../components/LiquidationExchange/S2E";

 import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute";
const Appside = ()=> {

    return(
        <Fragment>
             <div className="apphome">
              <Header />
                <Switch>
                        

                        <Route  path='/home' component={Home}/>
                        <Route path='/admin' component={AdminPage} />
                        <Route path='/vault' component={Vault} />
                        <Route exact path='/liquidations' component={LiquidationPage} />
                        <ProtectedRoute path='/liquidations/s2x' component={S2X} />
                        <ProtectedRoute path='/liquidations/s2e' component={S2E} />

                </Switch>
             
            </div>

        </Fragment>
    )

}
export default Appside;