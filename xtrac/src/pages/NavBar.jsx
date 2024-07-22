/**
 * NavBar Component
 * 
 * This component represents the navigation bar at the top of the application.
 * It includes a logo and links for Signup and Login using NavLink from react-router-dom.
 * 
 * Dependencies:
 * - NavLink: Component from react-router-dom for navigation links
 * - styles: CSS module containing component-specific styles
 * - logo: Image asset for the application logo
 */

import React from "react";
import { NavLink } from "react-router-dom"; // Component for navigation links
import styles from "./home.module.css"; // Import CSS Module for styling
import logo from "../assets/logo.png"; // Import image asset for logo

function NavBar() {
  return (
    <nav className={styles.navbar}>
      {/* Navbar content */}
      <div className={styles.navbarContent}>
        {/* Application logo */}
        <img src={logo} alt="logo" height="50px" className={styles.logo} />
        {/* Application title */}
        <h1 className={styles.navbarTitle}>
          <span>X</span>trac
        </h1>
      </div>
      {/* Navigation links */}
      <header className={styles.header}>
        <NavLink exact to="/signup" className={styles.navlink}>
          SIGNUP
        </NavLink>
        <NavLink exact to="/login" className={styles.navlink}>
          LOGIN
        </NavLink>
      </header>
    </nav>
  );
}

export default NavBar;
