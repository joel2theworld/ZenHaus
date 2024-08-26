import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Landing from "../../assets/ZH.png";
import Logo from "../../assets/zhlogo.png";
import "../../styles/SignUp.css";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams(); // Extract the token from the URL
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!password) newErrors.password = "Password is required.";
    if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";
    if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";

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
        `http://localhost:5001/auth/reset/${token}`,
        { password }
      );
      // Handle success
      toast.success("Password changed successfully! Redirecting...");
      // Redirect logic can be added here if using react-router
      setTimeout(() => {
        navigate("/login");
      }, 3000); //3seconds
    } catch (error) {
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
                <h2 className="form-title">Create New Password</h2>
                <div className="password-input">
                  <label htmlFor="password" className="input-label">
                    New Password
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

                <div className="password-input">
                  <label htmlFor="confirmPassword" className="input-label">
                    Confirm New Password
                  </label>
                  <div className="password-field">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      placeholder="Enter at least 6+ characters"
                      aria-label="Confirm password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <span
                      className="toggle-password"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                    {errors.confirmPassword && (
                      <p className="error-message">{errors.confirmPassword}</p>
                    )}
                  </div>
                </div>
                <button type="submit" className="submit-button">
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResetPassword;
