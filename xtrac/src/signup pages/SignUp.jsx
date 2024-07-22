import React, { useState } from 'react';
import styles from './Signup.module.css'; // Import CSS Module
import validateForm from './validation'; // Import validation function
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [formData, setFormData] = useState({
    fullname: '',
    password: '',
    email: '',
    mobile: '',
    gender: '',
  });

  const [error, setError] = useState({});
  const [reqError, setReqError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigateTo = useNavigate();

  const changeData = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addUsers = async () => {
    try {
      const { data } = await axios.post('http://localhost:7000/xtrac/signup', formData);
      if (data.error) {
        setReqError(data.error);
        alert('User already available');
      } else {
        setReqError('');
        navigateTo('/Login');
      }
    } catch (error) {
      setReqError('Failed to submit form. Please try again later.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const sendFormData = (e) => {
    e.preventDefault();
    const formErrors = validateForm(formData);
    setError(formErrors);
      addUsers();
  };

  return (
    <section className={styles.section}>
      <h1 className={styles.name}>
        X<span>trac</span>
      </h1>
      <div className={styles.formsection}>
        <h1>
          Sign <span>Up</span>
        </h1>
        <form onSubmit={sendFormData}>
          <div>
            <input
              type="text"
              name="fullname"
              placeholder="Enter Fullname"
              onChange={changeData}
              value={formData.fullname}
            />
            <p className={styles.error}>{error.fullname}</p>
          </div>
          <div className={styles.radio}>
            <label htmlFor="male">Male</label>
            <input type="radio" id="male" name="gender" value="male" onChange={changeData} />
            <label htmlFor="female">Female</label>
            <input type="radio" id="female" name="gender" value="female" onChange={changeData} />
            <p className={styles.error}>{error.gender}</p>
          </div>
          <div>
            <input
              type="tel"
              name="mobile"
              placeholder="Enter Mobile Number"
              onChange={changeData}
              value={formData.mobile}
            />
            <p className={styles.error}>{error.mobile}</p>
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={changeData}
              value={formData.email}
            />
            <p className={styles.error}>{error.email}</p>
          </div>
          <div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter password"
              onChange={changeData}
              value={formData.password}
            />
            <p className={styles.error}>{error.password}</p>
          </div>
          <div>
          <label htmlFor="showPassword">Show password</label>
          <input
              type="checkbox"
              id="showPassword"
              className={styles.input}
              onChange={togglePasswordVisibility}
            />
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
        {reqError && <p className={styles.error}>{reqError}</p>}
      </div>
    </section>
  );
}

export default Signup;
