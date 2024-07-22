/**
 * Express Routes Configuration Module
 * 
 * This module configures the HTTP routes for handling user authentication and expense data CRUD operations.
 * It imports controller functions from respective modules and assigns them to specific HTTP methods and routes.
 * 
 * Dependencies:
 * - express: Framework for building Node.js web applications
 * - user.controller: Module containing user authentication controller functions
 * - data.controller: Module containing expense data CRUD controller functions
 */

const express = require('express');
const { signup, login } = require('../controller/user.controller'); // Importing user authentication controller functions
const { addexp, getexp, deletexp, updatexp } = require('../controller/data.controller'); // Importing expense data CRUD controller functions

let route = express.Router();

/**
 * Route: POST /signup
 * Description: Endpoint for user signup
 * Controller Function: signup from user.controller
 */
route.post("/signup", signup);

/**
 * Route: POST /login
 * Description: Endpoint for user login
 * Controller Function: login from user.controller
 */
route.post("/login", login);

/**
 * Route: POST /exp
 * Description: Endpoint for adding expense data
 * Controller Function: addexp from data.controller
 */
route.post("/exp", addexp);

/**
 * Route: GET /getlist
 * Description: Endpoint for fetching expense data list
 * Controller Function: getexp from data.controller
 */
route.get("/getlist", getexp);

/**
 * Route: PUT /updatexp
 * Description: Endpoint for updating expense data
 * Controller Function: updatexp from data.controller
 */
route.put("/updatexp", updatexp);

/**
 * Route: DELETE /deletexp
 * Description: Endpoint for deleting expense data
 * Controller Function: deletexp from data.controller
 */
route.delete("/deletexp", deletexp);

// Exporting the configured route object for use in the main application
module.exports = route;