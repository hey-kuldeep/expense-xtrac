/**
 * User Model
 * 
 * Mongoose schema definition for user data storage in MongoDB.
 * Defines the structure of the user collection including validations and timestamps.
 * 
 * Dependencies:
 * - mongoose: MongoDB object modeling tool
 */

const { Schema, model } = require('mongoose'); // Importing mongoose for schema creation

/**
 * User Schema
 * 
 * Defines the structure and validations for the user collection in MongoDB.
 * Includes fields for fullname, gender, mobile number, email, password, and timestamps.
 */
let Userschema = new Schema({
    fullname: {
        type: String,
        required: [true, "Name is mandatory"]
    },
    gender: {
        type: String,
        required: [true, "Gender is mandatory"]
    },
    mobile: {
        type: String,
        required: [true, "Mobile number is mandatory"],
        unique: true,
        minlength: [10, "Mobile number should have 10 digits"]
    },
    email: {
        type: String,
        required: [true, "Email is mandatory"]
    },
    password: {
        type: String,
        required: [true, "Password is mandatory"]
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Exporting the mongoose model based on the schema
module.exports = model("user", Userschema);
