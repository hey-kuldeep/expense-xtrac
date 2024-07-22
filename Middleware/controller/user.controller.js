/**
 * User Controller
 * 
 * This file contains controller functions for user-related operations such as signup and login.
 * It interacts with the User model and uses bcrypt for password hashing and comparison.
 * 
 * Dependencies:
 * - ../models/user.models: User model for interacting with the MongoDB collection
 * - bcryptjs: Library for hashing passwords
 */

const user = require('../models/user.models'); // Importing User model
const bcrypt = require('bcryptjs'); // Importing bcryptjs for password hashing

/**
 * Signup Function
 * 
 * Handles user registration by hashing the password using bcrypt before storing in the database.
 * Checks if the user already exists based on email or mobile number.
 * 
 * @param {Object} req - Express request object containing user data in the body
 * @param {Object} res - Express response object for sending JSON response
 * @param {Function} next - Express next function to call the next middleware or handler
 * @returns {Promise<void>}
 */
let signup = async (req, res, next) => {
    try {
        let { fullname, gender, mobile, email, password } = req.body;

        // Hashing the password
        let salt = await bcrypt.genSalt(5);
        let hashedpassword = await bcrypt.hash(password, salt);

        // Checking if user already exists
        let isUserAvailable = await user.findOne({ $or: [{ mobile }, { email }] });

        if (isUserAvailable) {
            return res.status(403).json({ error: true, message: "User already registered" });
        } else {
            // Creating new user
            let newUser = await user.create({ fullname, gender, mobile, email, password: hashedpassword });
            return res.status(201).json({ error: false, message: "User registered successfully", data: newUser });
        }
    } catch (error) {
        next(error); // Pass error to error-handling middleware
    }
};

/**
 * Login Function
 * 
 * Handles user login by checking if the email exists and comparing the hashed password.
 * Returns appropriate error or success messages based on login status.
 * 
 * @param {Object} req - Express request object containing login credentials in the body
 * @param {Object} res - Express response object for sending JSON response
 * @param {Function} next - Express next function to call the next middleware or handler
 * @returns {Promise<void>}
 */
let login = async (req, res, next) => {
    let { email, password } = req.body;
    try {
        // Checking if user exists
        let userFound = await user.findOne({ email });

        if (userFound) {
            // Comparing passwords
            let isPasswordMatch = await bcrypt.compare(password, userFound.password);

            if (isPasswordMatch) {
                return res.status(200).json({ error: false, message: "Logged in successfully" });
            } else {
                return res.status(200).json({ error: true, message: "Incorrect email or password" });
            }
        } else {
            return res.status(404).json({ error: true, message: "User not found" });
        }
    } catch (error) {
        next(error); // Pass error to error-handling middleware
    }
};

// Exporting functions for use in routes
module.exports = { signup, login };
