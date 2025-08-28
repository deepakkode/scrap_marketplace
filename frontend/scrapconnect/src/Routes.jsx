import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthenticationGuard, { useAuth } from "./components/ui/AuthenticationGuard";
import Header from "./components/ui/Header";
import ExplorePage from "./pages/explore-page";
import LoginScreen from "./pages/login-screen";
import RegisterScreen from "./pages/register-screen";
import ProfilePage from "./pages/profile-page";
import UploadPage from "./pages/upload-page";
import NotFound from "./pages/NotFound";

function PrivateRoute({ children }){
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login-screen" replace />;
}

export default function AppRoutes(){
  return (
    <AuthenticationGuard>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/explore-page" replace />} />
        <Route path="/explore-page" element={<ExplorePage/>} />
        <Route path="/login-screen" element={<LoginScreen/>} />
        <Route path="/register-screen" element={<RegisterScreen/>} />
        <Route path="/profile-page" element={<PrivateRoute><ProfilePage/></PrivateRoute>} />
        <Route path="/upload-page" element={<PrivateRoute><UploadPage/></PrivateRoute>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </AuthenticationGuard>
  );
}
