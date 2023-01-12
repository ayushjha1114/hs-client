import React from "react";
import { Routes, Route } from "react-router";

import { notLoggedIn, authenticatedUsersOnly } from "./util/middleware/index";
import WelcomePage from "./modules/auth/Welcome";
import LoginPage from "./modules/auth/Login";
import AMCPlanDetails from "./modules/auth/AMCPlanDetails";
import Dashboard from "./modules/user/Dashboard";
import AdminDashboard from "./modules/admin/Dashboard";
import NoAccess from "./modules/admin/NoAccess";
import Services from "./modules/auth/Services";
import PublicPage from "./layout/PublicLayout";
import UserManagement from "./modules/admin/UserManagement";
import Tickets from "./modules/admin/Tickets";
import Brand from "./modules/admin/Brand";
import RegisterUser from "./modules/admin/RegisterUser";
import Service from "./modules/admin/Service";

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
          <Route path="user-management" element={<UserManagement />} />
          <Route path="register-user" element={<RegisterUser />} />
          <Route path="tickets" element={<Tickets />} />
          <Route path="brand" element={<Brand />} />
          <Route path="service" element={<Service />} />
      </Route>
      <Route path="no-access" element={<NoAccess />} />
    </Routes>
  );
};

export default AppRoutes;
