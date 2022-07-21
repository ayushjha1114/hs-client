import React from 'react';
import {
    Routes,
    Route,
} from 'react-router';

// import { notLoggedIn, authenticatedUsersOnly } from './util/middleware/index';
import WelcomePage from './modules/auth/Welcome';
// import LoginPage from './modules/auth/Login';
// import ResetPasswordPage from './modules/auth/ResetPassword';
// import ValidateTokenPage from './modules/auth/ValidateToken';
// import AuthLayout from './layout/Auth';

// import httpService from './axios-interceptors';

// httpService.setupInterceptors();

const AppRoutes = (props) => {
    return (
        <Routes>
            <Route path="/" element={<WelcomePage />} />
        </Routes>
    );
};


export default AppRoutes;
