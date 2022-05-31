import react from 'react';
import { useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import Web3 from 'web3';
const VaultBox = ({idx, vaultId, ecoin, xdc, xusd, udao})=>{
    const web3 = new Web3('https://boiling-taiga-83466.herokuapp.com/https://rpc.apothem.network');
    const [colprice, setcprice] = useState('0');
    const vid = web3.utils.hexToNumber(vaultId)
    const getcolprice = async ()=>{
        var ecp = await axios.get('https://boiling-taiga-83466.herokuapp.com/https://api.probit.com/api/exchange/v1/ticker?market_ids=ECOIN-USDT');
        var xcp = await axios.get('https://boiling-taiga-83466.herokuapp.com/https://api.probit.com/api/exchange/v1/ticker?market_ids=XDC-USDT');
        var ecp = ecp.data.data[0].last;
        var xcp = xcp.data.data[0].last;
        var col = (ecoin/10**18)* ecp + (xdc/10**18)* xcp;
        setcprice(col);
        console.log(col)
    };
    useState(()=>{
        getcolprice();
    }, [])
    return (
        <div className='vaultbox'>
            <br />
            <div className='borrowtablebox'>
                <div className='borrowtablerow'>
                    <div>
                    VaultId
                    </div>
                    <div>
                    {'0x..........'+vaultId.slice(-3)}
                    </div>
                </div>
                <div className='borrowtablerow'>
                    <div>
                    Current Collateral Price
                    </div>
                    <div>
                    ${colprice}
                    </div>
                </div>
                <div className='borrowtablerow'>
                    <div>
                    Unsafe Price
                    </div>
                    <div>
                    ${Math.round((colprice)/1.75)}
                    </div>
                </div>
                <div className='borrowtablerow'>
                    <div>
                    XUSD Debt
                    </div>
                    <div>
                    ${Math.round((xusd/10**18))}
                    </div>
                </div>
                <div className='borrowtablerow'>
                    <div>
                    Stablitiy Fees (UDAO)
                    </div>
                    <div>
                    ${Math.round((udao/10**18))}
                    </div>
                </div>
            </div>
            <br />
            <Link to={'/vault/access/'+(vid-1)} style={{textDecoration: 'none', color: 'black'}}>
            <div className='newbtnboxdiv'>
                Access Vault
            </div>
            </Link>
        </div>
    )
}
export default VaultBox;