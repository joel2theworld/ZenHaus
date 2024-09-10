import React from 'react'
import Logo from "../assets/zhlogo.png";
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="header-container">
      <div className="header-content">
      <div className="div">
        <img
          loading="lazy"
          src={Logo}
          className="img"
        />
        <div className="zen-hausser">ZenHaus</div>
      </div>
        <nav className="nav-menu">
          <a href="/" className="nav-item">Home</a>
          <a href="#" className="nav-item">About Us</a>
          <a href="/explore" className="nav-item">Explore</a>
          <a href="#" className="nav-item">Contact</a>
        </nav>
        <div className="auth-buttons">
          <a href='/login'><button className="login-button">Login</button></a>
          <a href='/signup'><button className="signup-button">Sign Up</button></a>
        </div>
      </div>
    </header>
  );
}

export default Header;
