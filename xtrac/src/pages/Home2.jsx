/**
 * Home2 Component
 * 
 * This component represents an alternate home page for the application.
 * It includes sections describing the functionalities of the expense tracking app.
 * Users can navigate to different pages (AddData, List, ManageData) using links/buttons.
 * 
 * Dependencies:
 * - styles: CSS module containing component-specific styles
 * - useLocation: Hook from react-router-dom for accessing location state
 * - useNavigate: Hook from react-router-dom for navigation
 */

import styles from "./home2.module.css"; // Import CSS module for styling
import { useLocation, useNavigate } from "react-router-dom"; // Hooks for location and navigation

function Home2() {
  const location = useLocation();
  const { email } = location.state || {}; // Extract email from location state

  const navigate = useNavigate();

  // Navigation functions to different pages with email state
  const navigateToexpenses = () => {
    navigate("/addData", { state: { loc: email } });
  };

  const navigateTolist = () => {
    navigate("/viewlist", { state: { loc: email } });
  };

  const navigateTomanage = () => {
    navigate("/ManageData", { state: { loc: email } });
  };

  // JSX rendering
  return (
    <article className={styles["home-container"]}>
      <h1 className={styles["home-title"]}>
        Track All Your Expenses with <span className={styles["home-span"]}>Xtrac</span>
      </h1>
      <section className={styles["home-section"]}>
        <div className={styles["home-box1"]}>
          <h1>Know Xtrac</h1>
          <ul>
            <li>
              Add Your Expense - enables You to input financial details like amount, date, and category into an application facilitating effective expense tracking and budget management.
            </li>
            <li>
              View Your Expense Lists - enables users to access and review their recorded expenditures, providing a convenient way to monitor financial activity within the application.
            </li>
            <li>
              Manage Expenses enables - You to edit existing expense details or remove outdated entries, providing flexibility and control over their financial data management.
            </li>
          </ul>
        </div>
        <div className={styles["home-box2"]}>
          <ul>
            {/* Links/buttons to navigate to different pages */}
            <li><a className={styles.navlink} onClick={navigateToexpenses}>Add Your Expense</a></li>
            <li><a className={styles.navlink} onClick={navigateTolist}>View Your Expense Lists</a></li>
            <li><a className={styles.navlink} onClick={navigateTomanage}>Manage Your Expenses</a></li>
          </ul>
        </div>
      </section>
    </article>
  );
}

export default Home2;
