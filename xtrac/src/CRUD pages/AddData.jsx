import React, { useState } from 'react';
import styles from './addData.module.css';
import axios from 'axios';
import img1 from '../assets/money.gif';
import { useLocation } from 'react-router-dom';

/**
 * Component for adding expense data.
 * Displays a form to input expense details and submit them.
 */
function AddData() {
  // Get current email state using react-router-dom's useLocation hook
  const location = useLocation();
  // Extract the email from location state or default to empty string
  const { loc } = location.state || {};

  // State hooks for form data, request error, and category selection
  const [formData, setFormData] = useState({
    email: loc,
    category: '',
    amount: '',
    date: '',
    description: ''
  });
  const [reqError, setReqError] = useState('');
  const [isCategorySelected, setIsCategorySelected] = useState(false);

  // Options for expense categories
  const categoryOptions = ['food', 'entertainment', 'transportation', 'others'];

  /**
   * Function to handle category selection change.
   * Updates form data with selected category.
   */
  const handleCategoryChange = (e) => {
    const { value } = e.target;
    setIsCategorySelected(value !== '');
    setFormData({ ...formData, category: value });
  };

  /**
   * Function to handle input change for all form fields.
   * Updates corresponding field in form data state.
   * @param {Object} e - Event object representing the input change.
   */
  const changeData = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /**
   * Function to submit form data.
   * Sends expense data to server using Axios.
   * Displays error message if submission fails.
   */
  const addData = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:7000/xtrac/exp', formData);
      if (data.error) {
        setReqError(data.error);
      } else {
        setReqError('');
        // Clear form data after successful submission
        setFormData({
          email: loc,
          category: '',
          amount: '',
          date: '',
          description: ''
        });
      }
    } catch (error) {
      console.error(error);
      setReqError('Please fill all fields.');
    }
  };

  /**
   * Function to handle form submission.
   * Calls addData function to submit form data.
   */
  const sendFormData = (e) => {
    e.preventDefault();
    addData();
  };

  return (
    <section className={styles.mainSection} id='next'>
      <div className={styles.image}>
        <img src={img1} alt="Money GIF" />
      </div>
      <div className={styles.formsection}>
        <h1>Add Your Expenses</h1>
        {/* Expense data form */}
        <form onSubmit={sendFormData}>
          <div>
            {/* Category dropdown */}
            <select name="category" onChange={handleCategoryChange} value={formData.category}>
              <option value="">Select Category</option>
              {categoryOptions.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div>
            {/* Input for category (disabled if category is selected) */}
            <input type="text" name="category" placeholder="Enter Category" onChange={changeData} value={formData.category}
              disabled={isCategorySelected} required={!isCategorySelected} />
          </div>
          <div>
            {/* Input for date */}
            <input type="date" name="date" onChange={changeData} value={formData.date} required />
          </div>
          <div>
            {/* Input for amount */}
            <input type="number" name="amount" placeholder="Enter Amount" onChange={changeData} value={formData.amount} required />
          </div>
          <div>
            {/* Input for description */}
            <input name="description" placeholder="Add Your Category Description" onChange={changeData} value={formData.description} required />
          </div>
          <div>
            {/* Submit button */}
            <button type="submit">Submit</button>
          </div>
        </form>
        {/* Display request error message */}
        {reqError && <p className={styles.error}>{reqError}</p>}
      </div>
    </section>
  );
}

export default AddData;
