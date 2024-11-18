import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import ForgotPassword from "../pages/auth/ForgotPassword";

import Dashboard from "../pages/Dashboard";

import ListResources from "../pages/resources/ListResources";
import CreateResource from "../pages/resources/CreateResource";
import EditResource from "../pages/resources/EditResource";

import ListServices from "../pages/services/ListServices";
import CreateService from "../pages/services/CreateService";
import EditService from "../pages/services/EditService";

import ListReservations from "../pages/reservations/ListReservations";
import CreateReservation from "../pages/reservations/CreateReservation";
import EditReservation from "../pages/reservations/EditReservation";

import Calendar from "../pages/calendar/Calendar";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        {/* <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        /> */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/resources" element={<ListResources />} />
        <Route path="/resources/new" element={<CreateResource />} />
        <Route path="/resources/edit/:id" element={<EditResource />} />
        <Route path="/services" element={<ListServices />} />
        <Route path="/services/new" element={<CreateService />} />
        <Route path="/services/edit/:id" element={<EditService />} />
        <Route path="/reservations" element={<ListReservations />} />
        <Route path="/reservations/new" element={<CreateReservation />} />
        <Route path="/reservations/edit/:id" element={<EditReservation />} />
        <Route path="/calendar" element={<Calendar  />} />

      </Routes>
    </Router>
  );
};

export default AppRoutes;
