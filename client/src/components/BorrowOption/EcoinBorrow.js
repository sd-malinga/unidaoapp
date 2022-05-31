import react from 'react';

const EcoinBorrow = ()=>{
    return (
        <div className='borrowboxecoin'>
             <div className="ecoinxdc" >
                        <img src='/assets/ecoinsmall.svg'/>
                        ECOIN
            </div>
            <div className='borrowtexth'>
            Low cost ECOIN
            </div>
            <div className='borrowtext'>
            The lowest Stability Fee and cheapest Vault for borrowing using ECOIN
            </div>
            <br />
            <div className='borrowtablebox'>
                <div className='borrowtablerow'>
                    <div>
                    Min Coll. Ratio
                    </div>
                    <div>
                    175%
                    </div>
                </div>
                <div className='borrowtablerow'>
                    <div>
                    Current Liquidity Available
                    </div>
                    <div>
                    100 M
                    </div>
                </div>
                <div className='borrowtablerow'>
                    <div>
                    Variable Annual Fee
                    </div>
                    <div>
                    2%
                    </div>
                </div>
            </div>
        </div>
    )
}
export default EcoinBorrow;