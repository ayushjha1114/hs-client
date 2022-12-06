import React, { useState } from 'react';
import NavigationNavigation from "./DistributorNav";
import DistributorHeader from "./DistributorHeader";
import jwt from 'jsonwebtoken';
import Auth from '../util/middleware/auth';
import { useLocation } from 'react-router-dom';

let UserLayout = (props) => {
    let location = useLocation();
    console.log("🚀 ~ file: User.js:10 ~ UserLayout ~ location", location)

    let access_token = Auth.getAccessToken();
    // const [isPathAdmin] = useState(props.route.path);
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
            console.log("🚀 ~ file: User.js:20 ~ UserLayout ~ isPathAdmin", isPathAdmin)
            // const isAdminLoggedIn = Auth.adminLoggedIn();
            // if (!isAdminLoggedIn) {
            //     // browserHistory.push("/no-access");
            // }
            // const ssoAuthTime = window.localStorage.getItem("TCPL_SSO_at");
            // const anHourAgo = Date.now() - (1000 * 60 * 60);
            // if (new Date(Number(ssoAuthTime)) < new Date(anHourAgo)) {
            //     Auth.removeSSOCreds();
            //     window.localStorage.clear();
            // }
    }
    return (
        <div id="dashboard-wrapper">
            <NavigationNavigation isAdminLogin={isPathAdmin} />
            <DistributorHeader isAdminLogin={isPathAdmin} />
            {props.children}
        </div>
    )

}
export default UserLayout;
