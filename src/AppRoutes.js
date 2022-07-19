import React from 'react';
import {
    Router,
    Route,
    browserHistory,
    IndexRoute
} from 'react-router';

import { notLoggedIn, authenticatedUsersOnly } from './util/middleware/index';
// ------------------Login pages-------------------//
import WelcomePage from './services/auth/Welcome';
import LoginPage from './services/auth/Login';
import LogoutPage from './services/auth/Logout';
import ResetPasswordPage from './services/auth/ResetPassword';
import ValidateTokenPage from './services/auth/ValidateToken';
import AuthLayout from './layout/Auth';
//------------------Layout-------------------//
import DistributorLayout from './layout/Distributor';

//-----------------DashboardPage-------------//
import Dashboard from './services/distributor/Dashboard/Dashboard';
import httpService from './axios-interceptors';
import EmailVerify from './services/distributor/EmailVerify/EmailVerify';
//Admin Dashboard 'admin/dashboard'
import AdminDashboard from './services/admin/Dashboard';
import NoAccess from './services/admin/NoAccess';

httpService.setupInterceptors();

const AppRoutes = (props) => {

    return (

        <Router history={browserHistory}>
            <Route path="/" component={AuthLayout} >
                <IndexRoute component={WelcomePage} onEnter={notLoggedIn} />
            </Route>
            <Route path="user" component={DistributorLayout} >
                <Route path="dashboard" component={Dashboard} onEnter={authenticatedUsersOnly} />
            </Route>

            <Route path="auth" component={AuthLayout} >
                <Route path="login" component={LoginPage} onEnter={notLoggedIn} />
                <Route path="logout" component={LogoutPage} />
                <Route path="validate-token" component={ValidateTokenPage} />
                <Route
                    path="reset-password"
                    component={ResetPasswordPage}
                    onEnter={notLoggedIn} />
                <IndexRoute component={WelcomePage} onEnter={notLoggedIn} />
            </Route>
            <Route path="email-verify/:id" component={EmailVerify} />
            <Route path="admin" component={DistributorLayout} >
                <Route path="dashboard" component={AdminDashboard} />
            </Route>
            <Route path="no-access" component={NoAccess} />
            <Route path='*' exact={true} component={AuthLayout} >
                <IndexRoute component={WelcomePage} onEnter={notLoggedIn} />
            </Route>
        </Router>
    );
};


export default AppRoutes;
