import React, { useState } from 'react';
import Navigation from "./NavLayout";
import HeaderLayout from "./HeaderLayout";
import jwt from 'jsonwebtoken';
import Auth from '../util/middleware/auth';
import { useLocation, useNavigate } from 'react-router-dom';

let UserLayout = (props) => {
    let location = useLocation();
    const navigate = useNavigate();

    let access_token = Auth.getAccessToken();
    const isPathAdmin = location.pathname.split("/")[1];
    console.log("🚀 ~ file: User.js:15 ~ UserLayout ~ isPathAdmin", isPathAdmin)

    let login_id = '';
    if (isPathAdmin !== 'admin') {
        if (!access_token) {
            // browserHistory.push("/");
        } else {
            login_id = jwt.decode(access_token).login_id;
        }
    } else if (isPathAdmin === 'admin') {
            const isAdminLoggedIn = Auth.adminLoggedIn();
            if (!isAdminLoggedIn) {
                navigate("/no-access");
            }
            const authTime = window.localStorage.getItem("login_at");
            const anHourAgo = Date.now() - (1000 * 60 * 60);
            if (new Date(Number(authTime)) < new Date(anHourAgo)) {
                window.localStorage.clear();
            }
    }
    return (
        <div id="dashboard-wrapper">
            <Navigation isAdminLogin={isPathAdmin} />
            <HeaderLayout isAdminLogin={isPathAdmin} />
            {props.children}
        </div>
    )

}
export default UserLayout;
