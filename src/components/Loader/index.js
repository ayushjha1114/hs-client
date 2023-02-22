import React from 'react';
import { useSelector } from "react-redux";

const Loader = () => {

    const isLoading = useSelector((state) => state.auth.isLoading);

    return (
        <>
            {(isLoading) &&
            <>
                <div className="loader-container">
                    <img src="/assets/images/DG.svg" alt="" />
                </div>
                </>
            }
        </>

    )
};


export default Loader;