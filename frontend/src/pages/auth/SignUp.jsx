import React, { useState } from "react";
import axios from "axios"; // Import axios
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import "../../styles/SignUp.css";
import Landing from "../../assets/ZH.png";
import Logo from "../../assets/zhlogo.png";

const SignUp = () => {
  // State for form inputs
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Validation states
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!firstName) newErrors.firstName = "First name is required.";
    if (!lastName) newErrors.lastName = "Last name is required.";
    if (!phoneNumber) newErrors.phoneNumber = "Phone number is required.";
    if (!email) newErrors.email = "Email is required.";
    if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid.";
    if (!password) newErrors.password = "Password is required.";
    if (password.length < 6) newErrors.password = "Password must be at least 6 characters.";
    if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match.";
    if (!termsAccepted) newErrors.termsAccepted = "You must accept the terms.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return; // If validation fails, stop submission
    }

    try {
      const response = await axios.post("http://localhost:5001/auth/signup", {
        email,
        password,
        firstName,
        lastName,
        phone: phoneNumber,
      });

      // Handle success
      toast.success("Signup successful! Please check your email.");
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
      <ToastContainer /> {/* Add ToastContainer for notifications */}
      <div className="sign-up-container">
        <div className="content-wrapper">
          <div className="image-column">
            <img
              loading="lazy"
              src={Landing}
              className="hero-image"
              alt="Decorative image representing ZenHaus"
            />
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
                <h2 className="form-title">Sign up</h2>
                <div className="name-fields">
                  <div className="input-group">
                    <label htmlFor="firstName" className="input-label">
                      First name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      className="input-field"
                      placeholder="Input first name"
                      aria-label="First name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    {errors.firstName && <p className="error-message">{errors.firstName}</p>}
                  </div>
                  <div className="input-group">
                    <label htmlFor="lastName" className="input-label">
                      Last name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      className="input-field"
                      placeholder="Input last name"
                      aria-label="Last name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                    {errors.lastName && <p className="error-message">{errors.lastName}</p>}
                  </div>
                </div>
                <div className="phone-input">
                  <label htmlFor="phoneNumber" className="input-label">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    className="phone-field"
                    placeholder="08123456789"
                    aria-label="Phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                  {errors.phoneNumber && <p className="error-message">{errors.phoneNumber}</p>}
                </div>
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
                  {errors.email && <p className="error-message">{errors.email}</p>}
                </div>
                <div className="password-input">
                  <label htmlFor="password" className="input-label">
                    Password
                  </label>
                  <div className="password-field">
                    <input
                      type="password"
                      id="password"
                      placeholder="Enter at least 6+ characters"
                      aria-label="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && <p className="error-message">{errors.password}</p>}
                  </div>
                </div>
                <div className="password-input">
                  <label htmlFor="confirmPassword" className="input-label">
                    Confirm Password
                  </label>
                  <div className="password-field">
                    <input
                      type="password"
                      id="confirmPassword"
                      placeholder="Enter at least 8+ characters"
                      aria-label="Confirm password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
                  </div>
                </div>
                <div className="terms-checkbox">
                  <div className="checkbox-wrapper">
                    <input
                      type="checkbox"
                      id="termsCheckbox"
                      className="visually-hidden"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                    />
                    <label htmlFor="termsCheckbox" className="checkbox"></label>
                    <span className="terms-text">
                      By signing up, I agree with the Terms of Use & Privacy Policy
                    </span>
                  </div>
                  {errors.termsAccepted && <p className="error-message">{errors.termsAccepted}</p>}
                </div>
                <button type="submit" className="submit-button">
                  Create an account
                </button>
                <p className="login-link">
                  Already have an account?{" "}
                  <a href="#" style={{ color: "#4a1ca6" }}>
                    Log in
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;