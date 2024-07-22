/**
 * Database Connection Module
 * 
 * This module establishes a connection to the MongoDB database using Mongoose.
 * It reads the database URI from the environment variables using dotenv.
 * 
 * Dependencies:
 * - mongoose: MongoDB object modeling tool for Node.js
 * - dotenv: Loads environment variables from a .env file into process.env
 */

const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

/**
 * Connect to MongoDB Database
 * 
 * This function connects to the MongoDB database using the URI specified in the
 * environment variable GLOBALDATABASE.
 * 
 * Note: Ensure that the environment variable GLOBALDATABASE is set in the .env file.
 * 
 * @returns {Promise<mongoose.Connection>} Mongoose Connection object
 */
let connectdb = mongoose.connect(process.env.GLOBALDATABASE);

// Exporting the Mongoose connection for use in other parts of the application
module.exports = connectdb;
