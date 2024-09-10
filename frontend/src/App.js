import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home.jsx';
import SignUp from './pages/auth/SignUp.jsx';
import Login from './pages/auth/Login.jsx';
import ForgotPassword from './pages/auth/ForgotPassword.jsx';
import ResetPassword from './pages/auth/ResetPassword.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import CreateProperty from './pages/Dashboard/CreateProperty.jsx';
import AllProperties from './pages/Dashboard/AllProperties.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import Explore from './pages/Links/Explore.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp/>} />
      <Route path="/login" element={<Login />} />
      <Route path='/forgot-password' element={<ForgotPassword/>}/>
      <Route path='/reset/:token' element={<ResetPassword/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/create-property' element={<CreateProperty/>}/>
      <Route path='/properties' element={<AllProperties/>}/>
      <Route path='/explore' element={<Explore/>}/>
    </Routes>
    </Router>
  )
}

export default App

