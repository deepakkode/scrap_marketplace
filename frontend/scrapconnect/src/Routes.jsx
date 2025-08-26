import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import AuthenticationGuard from "./components/ui/AuthenticationGuard";
import NotFound from "pages/NotFound";
import ProfilePage from './pages/profile-page';
import HomeFeed from './pages/home-feed';
import LoginScreen from './pages/login-screen';
import UploadPage from './pages/upload-page';
import ExplorePage from './pages/explore-page';
import RegisterScreen from './pages/register-screen';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <AuthenticationGuard>
          <RouterRoutes>
            {/* Define your route here */}
            <Route path="/" element={<ExplorePage />} />
            <Route path="/profile-page" element={<ProfilePage />} />
            <Route path="/home-feed" element={<HomeFeed />} />
            <Route path="/login-screen" element={<LoginScreen />} />
            <Route path="/upload-page" element={<UploadPage />} />
            <Route path="/explore-page" element={<ExplorePage />} />
            <Route path="/register-screen" element={<RegisterScreen />} />
            <Route path="*" element={<NotFound />} />
          </RouterRoutes>
        </AuthenticationGuard>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;