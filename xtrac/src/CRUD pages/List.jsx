/**
 * List Component
 * 
 * This component fetches and displays a list of expenses based on user email state.
 * It allows searching, filtering by week and year, and displays total spending by category.
 * 
 * Dependencies:
 * - react-router-dom: for accessing location state
 * - axios: for making HTTP requests
 * - styles: CSS module containing component-specific styles
 */

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import styles from './list.module.css'; // Import CSS module

function List() {
  const location = useLocation();
  const { loc } = location.state || {};

  // State variables
  const [reqError, setReqError] = useState(null);
  const [list, setList] = useState([]); // Full list of expenses
  const [filteredData, setFilteredData] = useState([]); // Filtered list based on search and filters
  const [searchTerm, setSearchTerm] = useState(''); // Search term entered by user
  const [categoryTotals, setCategoryTotals] = useState({}); // Total spending by category
  const [selectedWeek, setSelectedWeek] = useState(null); // Selected week for filtering
  const [selectedYear, setSelectedYear] = useState(null); // Selected year for filtering
  const [isLoading, setIsLoading] = useState(true); // Loading state

  // Fetch list of expenses from server
  const getList = async () => {
    try {
      const { data } = await axios.get('http://localhost:7000/xtrac/getlist', {
        params: { email: loc }
      });

      // Calculate total spending by category
      const totalsByCategory = data.value.reduce((acc, item) => {
        const { category, amount } = item;
        acc[category] = (acc[category] || 0) + amount;
        return acc;
      }, {});

      setList(data.value);
      setFilteredData(data.value);
      setCategoryTotals(totalsByCategory);
    } catch (error) {
      console.error(error);
      setReqError('Failed to fetch data');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch list on component mount and whenever location changes
  useEffect(() => {
    if (loc) {
      getList();
    }
  }, [loc]);

  // Fetch list on component mount
  useEffect(() => {
    getList();
  }, []);

  // Handle search input change
  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    const filteredList = list.filter((item) =>
      (item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.amount.toString().includes(searchTerm) ||
      item.date.includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!selectedWeek || getWeek(item.date) === selectedWeek) &&
      (!selectedYear || getYear(item.date) === selectedYear)
    );

    setFilteredData(filteredList);
  };

  // Placeholder functions for getting week and year from date string
  const getWeek = (dateString) => {
    return 1; // Replace with actual implementation
  };

  const getYear = (dateString) => {
    return 2024; // Replace with actual implementation
  };

  // JSX rendering
  return (
    <section className={styles.mainContainer}>
      <div className={styles.container}>
        {/* Error and loading messages */}
        {reqError && <p className={styles.error}>{reqError}</p>}
        {isLoading && <p className={styles.loading}>Loading...</p>}
        
        {/* Search input */}
        <div className={styles.search}>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            className={styles.searchInput}
          />
        </div>

        {/* Total spending by category */}
        <div className={styles.insights}>
          <h3>Total Spending by Category</h3>
          <ul>
            {Object.keys(categoryTotals).map((category) => (
              <li key={category}>
                <strong>{category}:</strong> &#8377;{categoryTotals[category]}
              </li>
            ))}
          </ul>
        </div>

        {/* Table of filtered expenses */}
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Category</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item._id} className={styles.row}>
                <td>{item.category}</td>
                <td>{item.amount}</td>
                <td>{item.date}</td>
                <td>{item.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default List;
