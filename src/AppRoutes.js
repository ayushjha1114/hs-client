import React from 'react';
import {
    Routes,
    Route,
} from 'react-router';

import { notLoggedIn, authenticatedUsersOnly } from './util/middleware/index';
import WelcomePage from './modules/auth/Welcome';
import LoginPage from './modules/auth/Login';
import AMCPlans from './modules/auth/AMCPlans';
import Dashboard from './modules/dashboard/Dashboard';
// import ResetPasswordPage from './modules/auth/ResetPassword';
// import ValidateTokenPage from './modules/auth/ValidateToken';

// import httpService from './axios-interceptors';

// httpService.setupInterceptors();

const AppRoutes = (props) => {
    return (
        <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/amc-plans" element={<AMCPlans />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    );
};


export default AppRoutes;
