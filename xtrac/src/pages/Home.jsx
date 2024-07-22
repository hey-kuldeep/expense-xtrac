/**
 * Home Component
 * 
 * This component represents the landing page of the application.
 * It includes a navigation bar, an introduction section with an image,
 * and a description of the expense tracking application.
 * Users can navigate to the signup page by clicking the "Get Started" button.
 * 
 * Dependencies:
 * - react: for building UI components
 * - NavBar: Component for the navigation bar
 * - styles: CSS module containing component-specific styles
 * - img1: Image asset for displaying a money tracking image
 * - useNavigate: Hook from react-router-dom for navigation
 */

import React from "react";
import NavBar from "./NavBar";
import styles from "./home.module.css"; // Import CSS module for styling
import img1 from "../assets/tracking.gif"; // Import image asset
import { useNavigate } from "react-router-dom"; // Hook for navigation

function Home() {
  const navigate = useNavigate();

  // Function to navigate to the signup page
  const navigateToSignup = () => {
    navigate("/signup");
  };

  // JSX rendering
  return (
    <div className={styles.home}>
      {/* Navigation bar component */}
      <NavBar />
      <main className={styles.main}>
        <div className={styles.box1}>
          {/* Image for money tracking */}
          <img src={img1} alt="money tracking image" height="400px" />
        </div>
        <div className={styles.box2}>
          {/* Title and description */}
          <h1>Welcome to Xtrac</h1>
          <p>
            Welcome to our expense tracker designed to simplify your financial
            management! With our intuitive interface, you can effortlessly
            customize categories to match your spending habits and efficiently
            track your expenses. Take control of your finances by easily
            managing and analyzing your data, ensuring you stay on top of your
            budgeting goals. Start organizing your expenses today and experience
            the convenience of streamlined financial tracking at your
            fingertips!
          </p>
          {/* Button to navigate to signup page */}
          <button onClick={navigateToSignup}>Get Started</button>
        </div>
      </main>
    </div>
  );
}

export default Home;
