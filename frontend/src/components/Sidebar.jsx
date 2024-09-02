import React from "react";
import { Link, useLocation } from "react-router-dom"; // Import Link and useLocation
import '../styles/Sidebar.css';
import Dash from '../assets/Layout 11.png';
import Logo from "../assets/zhlogo.png";
import Apartment from "../assets/Apartment.png";
import Add from "../assets/D add.png";
import Messages from "../assets/F chat.png";
import Help from "../assets/C question.png"; 

const Sidebar = () => {
  const location = useLocation(); // Get current location
  const currentPath = location.pathname; // Get the current path

  return (
    <div className="sidebar">
      <div className="div">
        <img
          loading="lazy"
          src={Logo}
          className="img"
        />
        <div className="zen-hausser">ZenHaus</div>
      </div>
      <div className="sidebar-menu-1">
        <Link to="/dashboard" className={`frame ${currentPath === '/dashboard' ? 'active' : ''}`} >
          <img
            loading="lazy"
            src={Dash}
            className="img-2"
          />
          <div className="dashboard">Dashboard</div>
        </Link>
        <Link to="/properties" className={`frame-2 ${currentPath === '/properties' ? 'active' : ''}`}>
          <img
            loading="lazy"
            src={Apartment}
            className="img-3"
          />
          <div className="all-properties">All Properties</div>
        </Link>
        <Link to="/messages" className={`frame-3 ${currentPath === '/messages' ? 'active' : ''}`}>
          <img
            loading="lazy"
            src={Messages}
            className="img-4"
          />
          <div className="messages">Messages</div>
        </Link>
        <Link to="/support" className={`frame-4 ${currentPath === '/support' ? 'active' : ''}`}>
          <img
            loading="lazy"
            src={Help}
            className="img-5"
          />
          <div className="support">Support</div>
        </Link>
        <Link to="/create-property" className={`frame-5 ${currentPath === '/create-property' ? 'active' : ''}`}>
          <img
            loading="lazy"
            src={Add}
            className="img-6"
          />
          <div className="create-listing">Create Listing</div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;