import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";

function Login() {
  const [formdata, setformdata] = useState({ email: "", password: "" });
  const [reqError, setReqError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigateTo = useNavigate();

  const changeData = ({ target: { value, name } }) => {
    setformdata({ ...formdata, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const getusers = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:7000/xtrac/login",
        formdata
      );
      if (data.error) {
        setReqError(data.message);
      } else {
        setReqError("");
        navigateTo("/home2", { state: { email: formdata.email } });
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setReqError("Failed to login. Please try again.");
    }
  };

  const logvalidation = async (e) => {
    e.preventDefault();
    try {
      await getusers();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const navigateTosignup = () => {
    navigateTo("/signup")
  };

  return (
    <section className={styles.section}>
      <h1 className={styles.name}>
        X<span>trac</span>
      </h1>
      <div className={styles.formsection}>
      {reqError && <p className={styles.error}>{reqError}</p>}
        <h1>
          Log<span>In</span>
        </h1>
        <form onSubmit={logvalidation}>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formdata.email}
              onChange={changeData}
              className={styles.input}
            />
          </div>
          <div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter password"
              value={formdata.password}
              onChange={changeData}
              className={styles.input}
            />
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
            <button type="submit" className={styles.button}>
              Submit
            </button>
          </div>
          <p>Dont Have and account?<a className={styles.anchor} onClick={navigateTosignup}>Signup</a></p>
        </form>
      </div>
    </section>
  );
}

export default Login;
