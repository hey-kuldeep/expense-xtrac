/**
 * CRUD Operations Module
 * 
 * This module provides CRUD (Create, Read, Update, Delete) operations for managing expense data.
 * It interacts with the 'usersdata' model to perform database operations.
 * 
 * Dependencies:
 * - usersdata: Model for interacting with the database, imported from '../models/data.models'
 */

const usersdata = require('../models/data.models'); // Importing the data model for CRUD operations

/**
 * Add Expense
 * 
 * Creates a new expense entry in the database.
 * 
 * @param {Object} req - Express request object containing expense details in req.body
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} JSON response indicating success or failure
 */
let addexp = async (req, res, next) => {
    try {
        let { email, category, amount, date, description } = req.body;
        let Data = await usersdata.create({ email, category, amount, date, description });
        return res.status(201).json({ error: false, message: "Data Added Successfully", data: Data });
    } catch (error) {
        next(error);
    }
};

/**
 * Get Expenses
 * 
 * Retrieves expense data from the database based on the provided email.
 * 
 * @param {Object} req - Express request object containing query parameters in req.query
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} JSON response containing fetched expense data or error message
 */
let getexp = async (req, res, next) => {
    try {
        let { email } = req.query;
        let Data = await usersdata.find({ email: email });
        return res.status(200).json({ error: false, message: "Data Fetched Successfully", value: Data });
    } catch (error) {
        next(error);
    }
};

/**
 * Update Expense
 * 
 * Updates an existing expense entry in the database.
 * 
 * @param {Object} req - Express request object containing expense details in req.body
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} JSON response indicating success or failure of update operation
 */
let updatexp = async (req, res, next) => {
    try {
        const { id, category, amount, date, description } = req.body;
        const updatedExpense = await usersdata.updateOne({ _id: id }, { $set: { category, amount, date, description } }, { new: true });
        return res.status(200).json({ error: false, message: "Data Updated Successfully", value: updatedExpense });
    } catch (error) {
        next(error);
    }
};

/**
 * Delete Expense
 * 
 * Deletes an expense entry from the database based on the provided id.
 * 
 * @param {Object} req - Express request object containing query parameters in req.query
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} JSON response indicating success or failure of delete operation
 */
let deletexp = async (req, res, next) => {
    try {
        const { id } = req.query;
        let Data = await usersdata.findOne({ _id: id });
        const result = await usersdata.deleteOne({ _id: id });
        return res.status(200).json({ error: false, message: "Data Deleted Successfully", data: result });
    } catch (error) {
        next(error);
    }
};

// Exporting the CRUD operations functions for use in other modules
module.exports = { addexp, getexp, deletexp, updatexp };
