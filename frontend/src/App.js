import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home.jsx';
import SignUp from './pages/auth/SignUp.jsx';
import Login from './pages/auth/Login.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp/>} />
      <Route path="/login" element={<Login />} />
    </Routes>
    </Router>
  )
}

export default App

