import React, { Fragment, useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import ProtectedRoute from '../../components/ProtectedRoute/ProtectedRoute';
import VaultAccess from '../../components/VaultAccess/VaultAccess';
import VaultDeposit from '../../components/VaultAccess/VaultDeposit';
import VaultPayback from '../../components/VaultAccess/VaultPayback';
import VaultFree from '../../components/VaultAccess/VaultFree';

const Vault = () => {

    function entervault(){
        if (sessionStorage.getItem('wallet') === null){
            window.alert('Connect Your Wallet')
        } else {
            window.alert('Vault Accessed')
            window.open('/vault/access', '_self');
        }
    
    }

    return(
            <Fragment>
                <div className='maincontent'>
                    <h3>Welcome to UniDAO Vaults</h3>    

                    <Switch>
                      <Route exact path='/vault' >
                      <button onClick={()=>{entervault()}}>Enter Vault</button>
                      </Route>

                      <ProtectedRoute path='/vault/access' component={VaultAccess} />
                      
                      <ProtectedRoute path='/vault/deposit' component={VaultDeposit} />
    
                      <ProtectedRoute path='/vault/payback' component={VaultPayback} />
                      <ProtectedRoute path='/vault/getcollateral' component={VaultFree} />
                    </Switch>
                    
                    </div>
                
            </Fragment>
    );
    }


export default Vault;