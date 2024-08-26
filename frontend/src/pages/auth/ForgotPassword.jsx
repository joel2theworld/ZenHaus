import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Landing from "../../assets/ZH.png";
import Logo from "../../assets/zhlogo.png";
import "../../styles/Login.css";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required.";
    if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return; // If validation fails, stop submission
    }

    try {
      const response = await axios.post(
        "http://localhost:5001/auth/forgot-password",
        {
          email,
        }
      );

      // Handle success
      toast.success("Check your email for a reset link!");
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
                <h2 className="form-title">Reset Password</h2>
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
                <button type="submit" className="submit-button">
                  Send Reset Link
                </button>
                <p className="login-link">
                  Return to <a href="/login">Login</a>
                  <p>
                    If the account exists, A link to reset your password will be
                    sent to your registered email.
                  </p>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForgotPassword;
