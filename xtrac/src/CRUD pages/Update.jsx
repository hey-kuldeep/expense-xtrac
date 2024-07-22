/**
 * Update Component
 * 
 * This component handles updating an expense with the provided form data.
 * It allows users to modify category, amount, date, and description of an expense.
 * On successful update, it navigates back to the ManageData component.
 * 
 * Dependencies:
 * - react: for building UI components
 * - axios: for making HTTP requests
 * - react-router-dom: for navigation and accessing location state
 * - styles: CSS module containing component-specific styles
 */

import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from "./update.module.css"; // Import CSS module

const Update = () => {
  const location = useLocation();
  const navigateTo = useNavigate();
  const { id, category, amount, date, desc, email } = location.state || {};

  // State variable to hold form data
  const [formData, setFormData] = useState({
    id: id,
    category: category,
    amount: amount,
    date: date,
    description: desc
  });

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send PUT request to update expense
      const response = await axios.put(`http://localhost:7000/xtrac/updatexp`, formData);

      // Clear form data after successful update
      setFormData({
        id: '',
        category: '',
        amount: '',
        date: '',
        description: ''
      });

      // Navigate back to ManageData component with success message
      navigateTo("/ManageData", { state: { loc: email, msg: response.data.message } });
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to navigate back to ManageData component without form submission
  const nav = () => {
    navigateTo("/ManageData", { state: { loc: email } });
  };

  // JSX rendering
  return (
    <section className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        {/* Input fields for category, amount, date, and description */}
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
          className={styles.input}
          required
        />

        <input
          type="text"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Amount"
          className={styles.input}
          required
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className={styles.input}
          required
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className={styles.textarea}
          required
        />

        {/* Button to submit form */}
        <button type="submit" onClick={nav} className={styles.button}>
          Update
        </button>
      </form>
    </section>
  );
};

export default Update;
