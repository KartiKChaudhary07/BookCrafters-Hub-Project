import React from "react";

import "./header.css";
import { Link } from "react-router-dom";
import { AuthProvider, useAuth } from "@/utils/authContext";


const CommonHeader = (props) => {
  const { isLoggedIn, currentUser, logout } = useAuth();
  return (
    <header className="header">
      <nav className="navbar">
        <Link to="/" className="logo">
          <img src="/logo.png" className="mylogo" alt="IntegraMinds Logo" />
          IntegraMinds
          <span>Book Craft- Digital Writing Desk</span>
        </Link>
        <ul className="nav-links">
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>

          {/* Based on the user state, show the login and register links */}
          {!isLoggedIn && (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}

          {/***
           * Based on the user state, show the Dashboard, Logout, Profile Avatar, etc
           * Add the code here
           */}

          {isLoggedIn && (
            <>
            {
              currentUser?.userType === "reader" &&
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              }
              <li>
                <Link to="/profile" className="flex flex-col gap-2 items-center justify-center">
                  <img
                    src={currentUser?.avatarUrl || "/avatar.png"}
                    alt="Profile Avatar"
                    className="avatar"
                  />
                  <span>
                  {currentUser?.fullName}
                  </span>
                </Link>
              </li>
              <li>
                <Link to="#" onClick={logout}>
                  Logout
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default CommonHeader;
