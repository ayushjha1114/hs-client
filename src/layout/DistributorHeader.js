import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import appLevelConfig from '../config';

const appConfig = appLevelConfig.app_level_configuration;

let DistributorHeader = props => {

    const [isAdmin] = useState(props.isAdminLogin);
    const [activeCount, setActiveCount] = useState(0)
    const [profileFeatureFlag, setProfileFeatureFlag] = useState(true);
    const [changePasswordFeatureFlag, setChangePasswordFeatureFlag] = useState(true);
    const [sessionInfoFeatureFlag, setSessionInfoFeatureFlag] = useState(false);

    const handleLogoutClick = () => {
    };
    const [open, setOpen] = useState(false);
    const myRef = useRef();

    const handleMenuClick = (e) => {
        e.preventDefault();
        setOpen(!open);
    };

    const handleClickOutside = e => {
        if (!myRef.current.contains(e.target)) {
            setOpen(false);
        }
    };

    const handleSubMenu = () => {
        setOpen(false);
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    });
    let screenWidth = window.screen.width;
    const toggleLeftNavbar = () => {
        if (screenWidth <= 767) {
            document.querySelector('body').classList.add('show-sidebar');
        } else {
            document.querySelector('body').classList.remove('hide-sidebar');
        }
    }

    return (
        <header className="dashboard-header">
            <div className="header-logo">
                <div id="nav-icon2" className="nav-icon" onClick={toggleLeftNavbar}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <img src="/assets/images/intel-icon.svg" alt="" style={{ width: "30%"}} />
            </div>
            <div className="header-right">
                {isAdmin === 'admin' ? <span>{'' ? 'ssoUserName' : window.localStorage.getItem('SSOUserName')}</span> : <span> xyz (10111)</span>}
                <div ref={myRef} className="user-img">
                    <img
                        onClick={e => handleMenuClick(e)}
                        src="/assets/images/user.svg"
                        alt=""
                    />
                    <ul className={`sub-menu ${isAdmin === 'admin' ? 'admin-sub-menu' : ''}`} onClick={handleSubMenu} style={{ display: open ? 'block' : 'none' }}>
                        {isAdmin === 'admin' ?
                            <>
                                {
                                    window.localStorage.getItem('role') === 'SUPER_ADMIN' &&
                                    <>
                                        <li>
                                            <div className="change-password">
                                                <Link to="/admin/app-settings">
                                                    <img src="/assets/images/setting-icon.svg" alt="" style={{ width: '16px' }} /> <em>App Settings</em></Link>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="change-password">
                                                <Link to="/admin/user-management">
                                                    <img src="/assets/images/user-management.svg" alt="" style={{ width: '13px' }} /> <em>User Management</em></Link>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="change-password">
                                                <Link to="/admin/sync-jobs">
                                                    <img src="/assets/images/sync-job.svg" alt="" style={{ width: '13px' }} /> <em>Sync Jobs</em></Link>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="change-password">
                                                <Link to="/admin/session-log">
                                                    <img src="/assets/images/session-icon.svg" alt="" style={{ width: '13px' }} /> <em>Session logs</em></Link>
                                            </div>
                                        </li>
                                    </>
                                }
                                <li onClick={handleSubMenu}>
                                    <div className="change-password">
                                        <a href="#" onClick={handleLogoutClick}>
                                            <img src="/assets/images/log-out.svg" alt="" style={{ width: '11px' }} /><em>Logout</em></a>
                                    </div>
                                </li>
                            </> :
                            <>
                                {sessionInfoFeatureFlag && 
                                    (<li>
                                        <div className="change-password session-counter">
                                            <Link>
                                                <em>{activeCount === '1' ? `${activeCount} Active Session` : `${activeCount} Active Sessions`}</em></Link>
                                        </div>
                                    </li>)
                                }
                                {profileFeatureFlag && 
                                    (
                                        <li>
                                            <div className="change-password">
                                                <Link to="/distributor/profile">
                                                    <img src="/assets/images/profile.svg" alt="" /> <em>Profile</em></Link>
                                            </div>
                                        </li>
                                    )
                                }
                                {changePasswordFeatureFlag && 
                                    (
                                        <li>
                                            <div className="change-password">
                                                <Link to="/distributor/change-password">
                                                    <img src="/assets/images/change-password.svg" alt="" /> <em>Change Password</em></Link>
                                            </div>
                                        </li>
                                    )
                                }
                                <li>
                                    <div className="change-password">
                                        <a href="#" onClick={handleLogoutClick}>
                                            <img src="/assets/images/logout.svg" alt="" /> <em>Logout</em></a>
                                    </div>
                                </li>
                            </>
                        }
                    </ul>
                </div>
            </div>
        </header>
    )

}

const mapStateToProps = (state) => {
    // let userData = {};
    // const token = Auth.getAccessToken();
    // if (token !== null) {
    //     userData = Auth.decodeToken(token);
    // }
    return {
        // sso_user_details: state.admin.get('sso_user_details'),
        // app_level_configuration: state.auth.get('app_level_configuration'),
        // userData
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        // distributorResetCreateOrderCompleteFormFields: () =>
        //     dispatch(Action.distributorResetCreateOrderCompleteFormFields()),
        // getSessionsLog: (data) => dispatch(Action.getSessionsLog(data)),
        // logout: () => dispatch(DashboardAction.logout()),
    }
}

const ConnectDistributorHeader = connect(
    mapStateToProps,
    mapDispatchToProps
)(DistributorHeader)

export default ConnectDistributorHeader;