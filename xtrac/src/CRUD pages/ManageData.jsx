/**
 * ManageData Component
 * 
 * This component manages expenses including fetching, updating, and deleting expenses.
 * It displays a list of expenses and allows users to update or delete each expense.
 * 
 * Dependencies:
 * - react: for building UI components
 * - axios: for making HTTP requests
 * - react-router-dom: for navigation and accessing location state
 * - styles: CSS module containing component-specific styles
 */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from "./manage.module.css"; // Import CSS module

const ManageData = () => {
  const location = useLocation();
  const { loc, msg } = location.state || {};
  
  // State variables
  const [expenses, setExpenses] = useState([]); // List of expenses fetched from server
  const [message, setMessage] = useState(); // Success or error message
  const [message2, setMessage2] = useState(); // Secondary message for updates
  const navigateTo = useNavigate();

  // Function to fetch expenses for a specific email
  const fetchExpenses = async () => {
    try {
      const { data } = await axios.get('http://localhost:7000/xtrac/getlist', {
        params: { email: loc }
      });
      setExpenses(data.value);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  // Function to update an expense
  const updateExpense = async ({ _id, category, amount, date, description }) => {
    navigateTo("/Update", { state: { id: _id, category, amount, date, desc: description, email: loc } });
  };

  // Function to delete an expense
  const deleteExpense = async (id) => {
    try {
      const { data } = await axios.delete(`http://localhost:7000/xtrac/deletexp`, {
        params: { id: id }
      });
      setMessage(data.message);
      fetchExpenses(); // Refresh expenses after deletion
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  // Effect to fetch expenses when location changes (user email changes)
  useEffect(() => {
    if (loc) {
      fetchExpenses();
      setMessage2(msg); // Set secondary message if available
    }
  }, [loc]);

  // JSX rendering
  return (
    <div className={styles.container}>
      <h2>Manage Expenses</h2>
      {/* Display success or error message */}
      {message && <p className={styles.p}>{message}</p>}
      {message2 && <p className={styles.p}>{message2}</p>}
    
      {/* Table displaying expenses */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Category</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Map through expenses and display each expense */}
          {expenses.map((expense) => (
            <tr key={expense._id}>
              <td>{expense.category}</td>
              <td>{expense.amount}</td>
              <td>{expense.date}</td>
              <td>{expense.description}</td>
              <td>
                {/* Button to update expense */}
                <button className={`${styles.button} ${styles.update}`} onClick={() => updateExpense(expense)}>Update</button>
                {/* Button to delete expense */}
                <button className={`${styles.button} ${styles.delete}`} onClick={() => deleteExpense(expense._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageData;
