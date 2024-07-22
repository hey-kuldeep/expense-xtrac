/**
 * UsersData Model
 * 
 * Mongoose schema definition for storing user expense data in MongoDB.
 * Defines the structure of the usersdata collection including validations and timestamps.
 * 
 * Dependencies:
 * - mongoose: MongoDB object modeling tool
 */

const { Schema, model } = require('mongoose'); // Importing mongoose for schema creation

/**
 * UsersData Schema
 * 
 * Defines the structure and validations for the usersdata collection in MongoDB.
 * Includes fields for email, category, amount, date, description, and timestamps.
 */
let UserDataschema = new Schema({
    email: {
        type: String,
        required: [true, "Email is mandatory"]
    },
    category: {
        type: String,
        required: [true, "Category is mandatory"]
    },
    amount: {
        type: Number,
        required: [true, "Amount is mandatory"]
    },
    date: {
        type: String,
        required: [true, "Date is mandatory"]
    },
    description: {
        type: String
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Exporting the mongoose model based on the schema
module.exports = model("usersdata", UserDataschema);
