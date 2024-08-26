import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Landing from "../../assets/ZH.png";
import Logo from "../../assets/zhlogo.png";
import "../../styles/Login.css";

const Login = () => {
  // State for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required.";
    if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid.";
    if (!password) newErrors.password = "Password is required.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return; // If validation fails, stop submission
    }

    try {
      const response = await axios.post("/api/login", {
        email,
        password,
      });

      // Handle success
      toast.success("Login successful! Redirecting...");
      // Redirect logic can be added here if using react-router

    } catch (error) {
      // Handle error
      if (error.response && error.response.data) {
        toast.error(error.response.data.msg || "An error occurred.");
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div>
      <ToastContainer />
      <section className="login-container">
        <div className="login-content">
          <div className="login-image">
            <img src={Landing} alt="Decorative login background" />
          </div>
          <div className="login-form-container">
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="logo-container">
                <img src={Logo} alt="ZenHaus logo" className="logo-image" />
                <span className="logo-text">ZenHaus</span>
              </div>
              <div className="login-header">
                <h1 className="login-title">Log In</h1>
                <p className="signup-link">
                  Don't have an account? <span>Sign Up</span>
                </p>
              </div>
              <div className="input-group">
                <label htmlFor="email" className="input-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="input-field"
                  placeholder="example.email@gmail.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <p className="error-message">{errors.email}</p>}
              </div>
              <div className="input-group">
                <label htmlFor="password" className="input-label">
                  Password
                </label>
                <div className="password-field input-field">
                  <input
                    type="password"
                    id="password"
                    placeholder="Enter at least 6+ characters"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/bc31de2f768621d99db9a446d230a58b04ebff7f262578505d75bb97b305f8b5?placeholderIfAbsent=true&apiKey=65b3ada40e564124a193992cddc527e9"
                    alt="Toggle password visibility"
                    className="password-toggle"
                  />
                </div>
                {errors.password && <p className="error-message">{errors.password}</p>}
              </div>
              <button type="submit" className="login-button">
                Log In
              </button>
              <a href="/forgot-password" className="forgot-password">
                I have forgotten my password
              </a>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;