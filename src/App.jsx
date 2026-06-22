import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { WishlistProvider } from "./context/WishlistContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ChooseRole from "./pages/ChooseRole";
import BuyerDashboard from "./pages/BuyerDashboard";
import SellerDashboard from "./pages/SellerDashboard";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <WishlistProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/choose-role" element={<ChooseRole />} />
            </Route>

            {/* Role-Specific Protected Routes */}
            <Route element={<ProtectedRoute requireRole="buyer" />}>
              <Route path="/buyer/dashboard" element={<BuyerDashboard />} />
            </Route>

            <Route element={<ProtectedRoute requireRole="seller" />}>
              <Route path="/seller/dashboard" element={<SellerDashboard />} />
            </Route>
          </Routes>
        </WishlistProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
