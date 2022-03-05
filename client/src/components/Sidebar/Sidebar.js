import { Wallet } from "ethers";
import React, { Fragment } from "react";

import { NavLink } from "react-router-dom";
import { BrowserRouter as Router } from 'react-router-dom';

 
const Sidebar = ()=> {
    return(
        <Fragment>
            <div className="sidebar">
                <div className="sidebar_content">
                    <img alt ="logo" src='https://unidao-gmann.ondigitalocean.app/assets/Fyqg9KY.png' style={{width: '200px'}} />
  
                    <div className="sidebar_options" style={{textDecoration: 'none'}}>
                        <NavLink to='/home' style={{textDecoration: 'none', color: 'white'}} activeStyle={{color: '#1dab98'}}>
                        <h4 style={{textDecoration: 'none'}}>Home</h4>
                        </NavLink>   
                        <NavLink to='/vault' style={{textDecoration: 'none', color: 'white'}} activeStyle={{color: '#1dab98'}}>          
                        <h4 style={{textDecoration: 'none'}}>Vault</h4>
                        </NavLink> 
                        <h4>Liquidations</h4>      
                        <h4>Admin</h4>  
                     
                    </div>
                </div>
            </div>

        </Fragment>
    )

}
export default Sidebar;