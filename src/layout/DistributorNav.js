import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
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
                            <li>
                                <Link to={'/admin/dashboard'}>
                                    <img src="/assets/images/so-icon.svg" alt="" />
                                    Dashboard
                                </Link>
                            </li>
                            :
                            <>
                                <li>
                                    <Link to={'/distributor/dashboard'}>
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

const mapStateToProps = state => {
    return {
        // createOrderData: state.distributor.get('create_order'),
        // app_level_configuration: state.auth.get('app_level_configuration'),
    }
}
const mapDispatchToProps = dispatch => {
    return {
        // distributorResetCreateOrderCompleteFormFields: () =>
        //     dispatch(Action.distributorResetCreateOrderCompleteFormFields()),
        // fetchAppLevelConfiguration: () => dispatch(AuthAction.fetchAppLevelSettings())
    }
}

const ConnectNavigation = connect(
    mapStateToProps,
    mapDispatchToProps
)(Navigation)

export default ConnectNavigation;