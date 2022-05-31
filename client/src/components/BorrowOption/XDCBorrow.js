import react from 'react';

const XDCBorrow = ()=>{
    return (
        <div className='borrowboxxdc'>
             <div className="ecoinxdc" >
                        <img src='/assets/xdcsmall.svg'/>
                        XDC
            </div>
            <div className='borrowtexth'>
            Low cost XDC
            </div>
            <div className='borrowtext'>
            The lowest Stability Fee and cheapest Vault for borrowing using XDC
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
                    500 M
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
export default XDCBorrow;