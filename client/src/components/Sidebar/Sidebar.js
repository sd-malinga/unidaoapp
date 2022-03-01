import { Wallet } from "ethers";
import React, { Fragment } from "react";

import { Link } from "react-router-dom";
import { BrowserRouter as Router } from 'react-router-dom';

 
const Sidebar = ()=> {
    return(
        <Fragment>
            <div className="sidebar">
                <div className="sidebar_content">
                    <img alt ="logo" src='https://unidao-gmann.ondigitalocean.app/assets/Fyqg9KY.png' style={{width: '200px'}} />
                    <h2>UNIDAO DeFi</h2>
                    <div className="sidebar_options">
                        <Link to='/'>
                        <h4>Home</h4>
                        </Link>   
                        <Link to='/vault'>          
                        <h4>Vault</h4>
                        </Link> 
                        <h4>Liquidations</h4>      
                        <h4>Admin</h4>  
                     
                    </div>
                </div>
            </div>

        </Fragment>
    )

}
export default Sidebar;