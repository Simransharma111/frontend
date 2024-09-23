import React from 'react';
// import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
// import Services from './pages/Services';
import UploadDetail from './pages/UploadDetail';
import PrivateRoute from './components/PrivateRoute';
import SignUp from './pages/SignUp';
import MyData from './pages/MyData';
import RoomList from './pages/RoomList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Dashboard from './components/Dashboard';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ContactUs from './pages/ContactUs';

function App() {
  return (
   <>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/roomlist" element={<RoomList />} />
        
        {/* Wrap PrivateRoute around protected routes */}

        <Route  path="/dashboard" element={<PrivateRoute element={Dashboard} />} />
        <Route  path="/upload-detail" element={<PrivateRoute element={UploadDetail} />} />
        <Route  path="/mydata" element={<PrivateRoute element={MyData} />} />
        <Route  path="/contact" element={<PrivateRoute element={ContactUs} />} />

      </Routes>
      </>
  );
}

export default App;
