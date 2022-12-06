import React from "react";
import { Routes, Route } from "react-router";

import { notLoggedIn, authenticatedUsersOnly } from "./util/middleware/index";
import WelcomePage from "./modules/auth/Welcome";
import LoginPage from "./modules/auth/Login";
import AMCPlanDetails from "./modules/auth/AMCPlanDetails";
import Dashboard from "./modules/user/Dashboard";
import AdminDashboard from "./modules/admin/Dashboard";
import Services from "./modules/auth/Services";
import PublicPage from "./layout/PublicLayout";

// import httpService from './axios-interceptors';

// httpService.setupInterceptors();

const AppRoutes = (props) => {
  return (
    <Routes>
      <Route path="/" element={<PublicPage />} />
      <Route path="amc-plans-details" element={<AMCPlanDetails />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="services" element={<Services />} />
      <Route path="welcome" element={<WelcomePage />}></Route>
      <Route path="admin" /* element={<UserLayout />} */ >
          <Route path="dashboard" element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
