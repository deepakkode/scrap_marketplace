import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthenticationGuard";
export default function Header(){
  const { user, logout } = useAuth();
  return (
    <header className="w-full border-b">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <Link to="/" className="font-semibold">ScrapConnect</Link>
        <nav className="flex items-center gap-4">
          <Link to="/explore-page">Explore</Link>
          {user ? (<><Link to="/profile-page">Profile</Link><button onClick={logout} className="underline">Logout</button></>) : (<><Link to="/login-screen">Login</Link><Link to="/register-screen">Register</Link></>)}
          <Link to="/upload-page">Upload</Link>
        </nav>
      </div>
    </header>
  );
}
