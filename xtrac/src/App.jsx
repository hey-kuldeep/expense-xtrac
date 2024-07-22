/**
 * App Component
 * 
 * This is the main component that defines the routing for different pages of the application.
 * It uses HashRouter from react-router-dom for routing and Routes for defining individual routes.
 * Each route corresponds to a specific page/component of the application.
 * 
 * Dependencies:
 * - react: for building UI components
 * - react-router-dom: for client-side routing using HashRouter, Route, and Routes
 * - SignUp: Component for user signup
 * - Login: Component for user login
 * - Home: Component for the home page
 * - Home2: Component for an alternate home page
 * - AddData: Component for adding new data (CRUD operation)
 * - List: Component for viewing a list of data (CRUD operation)
 * - ManageData: Component for managing data (CRUD operation)
 * - Update: Component for updating data (CRUD operation)
 */

import SignUp from "../src/signup pages/SignUp";
import { HashRouter, Route, Routes } from "react-router-dom";
import Login from "../src/signup pages/Login";
import Home from "../src/pages/Home";
import Home2 from "../src/pages/Home2";
import AddData from "./CRUD pages/AddData";
import List from "./CRUD pages/List";
import ManageData from "./CRUD pages/ManageData";
import Update from "./CRUD pages/Update";

function App() {
  return (
    <div>
      {/* HashRouter for defining client-side routing */}
      <HashRouter>
        <Routes>
          {/* Route for the default home page */}
          <Route path="/" element={<Home />} />
          {/* Route for the signup page */}
          <Route path="/signup" element={<SignUp />} />
          {/* Route for the login page */}
          <Route path="/login" element={<Login />} />
          {/* Route for an alternate home page */}
          <Route path="/home2" element={<Home2 />} />
          {/* Route for adding new data */}
          <Route path="/addData" element={<AddData />} />
          {/* Route for viewing a list of data */}
          <Route path="/viewlist" element={<List />} />
          {/* Route for managing data */}
          <Route path="/ManageData" element={<ManageData />} />
          {/* Route for updating data */}
          <Route path="/Update" element={<Update />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
