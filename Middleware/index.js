/**
 * Main Application Setup
 * 
 * This file configures and starts the Express server for the Xtrac application.
 * It includes middleware setup for handling JSON requests, CORS, and routes.
 * The MongoDB connection is established asynchronously using Mongoose.
 * 
 * Dependencies:
 * - express: Framework for building Node.js web applications
 * - cors: Middleware for enabling Cross-Origin Resource Sharing (CORS)
 * - dotenv: Loads environment variables from a .env file into process.env
 * - ./routes/user.routes: Module containing user-related HTTP routes configuration
 * - ./connect: Module for establishing connection to MongoDB database using Mongoose
 */

const express = require('express');
const route = require('./routes/user.routes'); // Importing user routes configuration
const connectdb = require('./connect'); // Importing database connection module
const cors = require('cors'); // Importing CORS middleware
require('dotenv').config(); // Load environment variables from .env file

let app = express();

// Middleware setup
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies of incoming requests
app.use("/xtrac", route); // Mounting user routes under /xtrac

/**
 * Start Server Function
 * 
 * This asynchronous function connects to the MongoDB database and starts the Express server.
 * It listens on the port specified in the environment variable PORT.
 * 
 */
let startServer = async () => {
    try {
        // Connect to MongoDB
        await connectdb;
        console.log("MongoDB connected successfully");

        // Start Express server
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    } catch (error) {
        console.error("Error starting server:", error);
    }
};

// Start the server
startServer();

// Exporting the app object for potential 
