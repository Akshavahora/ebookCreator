import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import EditorPage from "./pages/EditorPage";
import ViewBookpage from "./pages/ViewBookpage";
import ProfilePage from "./pages/ProfilePage";

const App = () => {
  return (
    <div>
      <Routes>
        {/* Public Rooutes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/Signup" element={<SignupPage />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route
          path="/editor/:bookId"
          element={<ProtectedRoute><EditorPage /></ProtectedRoute>} />
        <Route
          path="/view-book/:bookId"
          element={<ProtectedRoute><ViewBookpage /></ProtectedRoute>} />
        <Route
          path="/profile"
          element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      </Routes>
    </div>
  )
}

export default App