import React from "react";
import '../styles/Sidebar.css';

const Sidebar = () => {
  return (
    <div class="sidebar">
      <div class="div">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/5efa74ad956aabc71e362cbc58c78b6f2e952ca7772065805e166fb638f89c08?placeholderIfAbsent=true&apiKey=65b3ada40e564124a193992cddc527e9"
          class="img"
        />
        <div class="zen-hausser">ZenHaus</div>
      </div>
      <div class="sidebar-menu-1">
        <div class="frame">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/fd633d18adf7156ea87fce29f3009a546a573d2355da0b3bdbd04d8a81f09e92?placeholderIfAbsent=true&apiKey=65b3ada40e564124a193992cddc527e9"
            class="img-2"
          />
          <div class="dashboard">Dashboard</div>
        </div>
        <div class="frame-2">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/b5c494319e3f74b67d70c063c6a50ab5b7d2b24d04069d52b75ad96b2167c7b8?placeholderIfAbsent=true&apiKey=65b3ada40e564124a193992cddc527e9"
            class="img-3"
          />
          <div class="all-properties">All Properties</div>
        </div>
        <div class="frame-3">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/d85a83a74d49b7457c807384750ce5c606dcf2bc92b72d1786714b5eb1d50df8?placeholderIfAbsent=true&apiKey=65b3ada40e564124a193992cddc527e9"
            class="img-4"
          />
          <div class="messages">Messages</div>
        </div>
        <div class="frame-4">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/796fdabfa00362620e2a78999f9bdd7ca22791d029277666e51feb019d7235af?placeholderIfAbsent=true&apiKey=65b3ada40e564124a193992cddc527e9"
            class="img-5"
          />
          <div class="support">Support</div>
        </div>
        <a href="/create-property" style={{textDecoration: 'none'}}>
        <div class="frame-5">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/928b29cbdeca0574f142d1639e70347c07c4d9f1df869e7c26ed7234f8be33f4?placeholderIfAbsent=true&apiKey=65b3ada40e564124a193992cddc527e9"
            class="img-6"
          />
          <div class="create-listing">Create Listing</div>
        </div>
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
