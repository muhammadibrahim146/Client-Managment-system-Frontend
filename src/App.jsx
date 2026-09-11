import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./Component/Login";
import Dashboard from "./Component/Dashboard";
import Customers from "./Component/Customer";
import AddClient from "./Component/Addclient";
import Layout from "./Component/Layout";
import ProtectedRoute from "./Component/ProtectedRoute";

const App = () => {
  return (
  
      <Routes>

        {/* =========================
            DEFAULT
        ========================= */}
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        {/* =========================
            LOGIN
        ========================= */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* =========================
            PROTECTED AREA
        ========================= */}
        <Route element={<ProtectedRoute />}>

          {/* Common Layout */}
          <Route element={<Layout />}>

            <Route
              path="/dashboard"
              element={<Dashboard />}
            />

            <Route
              path="/customers"
              element={<Customers />}
            />

            <Route
              path="/add-client"
              element={<AddClient />}
            />

          </Route>

        </Route>

        {/* =========================
            UNKNOWN ROUTE
        ========================= */}
        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />

      </Routes>
    
  );
};

export default App;
