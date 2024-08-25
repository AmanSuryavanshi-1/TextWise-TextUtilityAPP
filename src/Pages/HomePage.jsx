import React from 'react'
import Navbar from '../Components/Navbar';
import About from './About';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../Components/Footer';

const HomePage = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  return (
    <>
    <div>
        <Navbar />
        {isHomePage && <About />}
        <Outlet />
        <Footer/>
    </div>
    </>
  )
}

export default HomePage
