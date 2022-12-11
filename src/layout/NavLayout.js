import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DistributorLink, AdminLink } from '../config/sideNav';

let Navigation = props => {

    const { isAdminLogin } = props;


    let links;
    if (isAdminLogin === 'admin') {
        links = AdminLink;
    } else {
        links = DistributorLink;
    }
    let screenWidth = window.screen.width;
    const toggleNavbar = () => {
        if (screenWidth <= 767) {
            document.querySelector('body').classList.remove('show-sidebar');
        } else {
            document.querySelector('body').classList.add('hide-sidebar');
        }
    }

    useEffect(() => {
        if (screenWidth <= 767) {
            document.addEventListener('mousedown', toggleNavbar);
        }
        return () => document.removeEventListener('mousedown', toggleNavbar);
    });

    return (
        <div className="left-sidebar">
            <div id="nav-icon" className="nav-icon" onClick={toggleNavbar}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className="menu">
                <ul>
                    {
                        isAdminLogin === 'admin' ?
                            <>
                                <li>
                                    <Link to={'/admin/dashboard'}>
                                        {/* <i class="fa-solid fa-house"></i> */}
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'/admin/dashboard'}>
                                        {/* <i class="fa-solid fa-user"></i> */}
                                        New User Registration
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'/admin/dashboard'}>
                                        {/* <i class="fa-solid fa-user"></i> */}
                                        User Management
                                    </Link>
                                </li>
                            </>
                            :
                            <>
                                <li>
                                    <Link to={'/dashboard'}>
                                        <img src="/assets/images/so-icon.svg" alt="" />
                                        Text
                                    </Link>
                                </li>
                            </>
                    }
                </ul>
            </div>
        </div>
    )
}

export default Navigation;