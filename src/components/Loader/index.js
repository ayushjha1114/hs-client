import React from 'react'
import './index.css';

let Loader = props => {

    const { isLoading } = props
    // const { isLoad, text = '' } = isLoading;
    return (
        <>
            {(isLoading /* || isLoad */) &&
            <>
                <div className="loader-container">
                    {/* <img src={loaderImg} /> */}
                    <img src="/assets/images/small-loader.gif" alt="" />
                    {/* {
                        text && <p className="loader-text">{text}</p> 
                    } */}
                </div>
                </>
            }
        </>

    )
};


export default Loader;
