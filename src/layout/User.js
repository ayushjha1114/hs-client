import React, { useState } from 'react';
import NavigationNavigation from "./DistributorNav";
import DistributorHeader from "./DistributorHeader";
import jwt from 'jsonwebtoken';
import { connect } from 'react-redux';
import Auth from '../util/middleware/auth';
import config from '../config/server';
// import * as Action from '../services/admin/actions/adminAction';

let UserLayout = (props) => {
    const { loaderShowHide } = props;
    let access_token = Auth.getAccessToken();
    // const [isPathAdmin] = useState(props.route.path);
    const isPathAdmin = 'aa'

    let login_id = '';
    if (isPathAdmin !== 'admin') {
        if (!access_token) {
            // browserHistory.push("/");
        } else {
            login_id = jwt.decode(access_token).login_id;
        }
    } else if (isPathAdmin === 'admin') {
        loaderShowHide(true);
        setTimeout(() => {
            const isAdminLoggedIn = Auth.adminLoggedIn();
            if (!isAdminLoggedIn) {
                // browserHistory.push("/no-access");
            }
            const ssoAuthTime = window.localStorage.getItem("TCPL_SSO_at");
            const anHourAgo = Date.now() - (1000 * 60 * 60);
            if (new Date(Number(ssoAuthTime)) < new Date(anHourAgo)) {
                Auth.removeSSOCreds();
                window.localStorage.clear();
            }
            loaderShowHide(false);
        }, 1000);
    }
    return (
        <div id="dashboard-wrapper">
            <NavigationNavigation isAdminLogin={isPathAdmin} />
            <DistributorHeader isAdminLogin={isPathAdmin} />
            {props.children}
        </div>
    )

}

const mapStateToProps = () => {
    return {}
}
const mapDispatchToProps = (dispatch) => {
    return {
        // loaderShowHide: (show) =>
        //     dispatch(Action.loaderShowHide(show))
    }
}

const ConnectUserLayout = connect(
    mapStateToProps,
    mapDispatchToProps
)(UserLayout)
export default ConnectUserLayout;
