import React from "react";
import { Routes, Route } from "react-router";

import { notLoggedIn, authenticatedUsersOnly } from "./util/middleware/index";
import WelcomePage from "./modules/auth/Welcome";
import LoginPage from "./modules/auth/Login";
import AMCPlanDetails from "./modules/auth/AMCPlanDetails";
import Dashboard from "./modules/dashboard/Dashboard";
import Services from "./modules/auth/Services";
import PublicPage from "./layout/PublicLayout";

// import ResetPasswordPage from './modules/auth/ResetPassword';
// import ValidateTokenPage from './modules/auth/ValidateToken';

// import httpService from './axios-interceptors';

// httpService.setupInterceptors();

const AppRoutes = (props) => {
  return (
    <Routes>
      <Route path="/" element={<PublicPage />} />
      <Route path="/amc-plans-details" element={<AMCPlanDetails />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/services" element={<Services />} />
      <Route path="/welcome" element={<WelcomePage />}></Route>
    </Routes>
  );
};

export default AppRoutes;
