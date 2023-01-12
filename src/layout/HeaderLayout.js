import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import appLevelConfig from '../config';
import Auth from '../util/middleware/auth';

const appConfig = appLevelConfig.app_level_configuration;

let HeaderLayout = props => {
    const navigate = useNavigate();
    const [isAdmin] = useState(props.isAdminLogin);
    const [activeCount, setActiveCount] = useState(0)
    const [profileFeatureFlag, setProfileFeatureFlag] = useState(true);
    const [changePasswordFeatureFlag, setChangePasswordFeatureFlag] = useState(true);

    const handleLogoutClick = () => {
        Auth.logout();
        navigate('/login')
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
                <img src="/assets/images/DGSoft-logo.png" alt="" style={{ width: "18%"}} />
            </div>
            <div className="header-right">
                <span>{window.localStorage.getItem('user_name')}</span> 
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
                                    window.localStorage.getItem('role') === 'ADMIN' &&
                                    <>
                                        <li>
                                            <div className="change-password">
                                                <Link to="/admin/user-management">
                                                    <img src="/assets/images/user-management.svg" alt="" style={{ width: '13px' }} /> <em>User Management</em></Link>
                                            </div>
                                        </li>
                                    </>
                                }
                                <li onClick={handleSubMenu}>
                                    <div className="change-password">
                                        <a href="#" onClick={handleLogoutClick}>
                                            <img src="/assets/images/logout.svg" alt="" style={{ top: '0px', left: '-9px', width: ' 28px' }} /><em>Logout</em></a>
                                    </div>
                                </li>
                            </> :
                            <>
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

export default HeaderLayout;