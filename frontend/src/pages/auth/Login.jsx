import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Landing from "../../assets/ZH.png";
import Logo from "../../assets/zhlogo.png";
import "../../styles/Login.css";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  // State for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

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
      const response = await axios.post("http://localhost:5001/auth/login", {
        email,
        password,
      });
      const token = response.data.token;
      const userId = response.data.userId;
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      // Handle success
      toast.success("Login successful! Redirecting...");
      // Redirect logic can be added here if using react-router
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000); //3seconds
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
          <div className="form-column">
            <form className="register-form" onSubmit={handleSubmit}>
              <div className="form-content">
                <div className="logo-wrapper">
                  <img
                    loading="lazy"
                    src={Logo}
                    className="logo-image"
                    alt="ZenHaus logo"
                  />
                  <h1 className="logo-text">ZenHaus</h1>
                </div>
                <h2 className="form-title">Log In</h2>
                <div className="email-input">
                  <label htmlFor="email" className="input-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="email-field"
                    placeholder="example.email@gmail.com"
                    aria-label="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && (
                    <p className="error-message">{errors.email}</p>
                  )}
                </div>
                <div className="password-input">
                  <label htmlFor="password" className="input-label">
                    Password
                  </label>
                  <div className="password-field">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      placeholder="Enter at least 6+ characters"
                      aria-label="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span
                      className="toggle-password"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                    {errors.password && (
                      <p className="error-message">{errors.password}</p>
                    )}
                  </div>
                </div>
                <button type="submit" className="submit-button">
                  Log In
                </button>
                <p className="login-link">
                  Don't have an account?{" "}
                  <a href="/signup" >
                    Sign Up
                  </a>
                  <p><a href="/forgot-password">Forgot Password</a></p>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;