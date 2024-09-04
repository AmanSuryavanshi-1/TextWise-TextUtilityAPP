import React from 'react'
import Navbar from '../Components/Navbar';
import About from './About';
import { Outlet, useLocation } from 'react-router-dom';
import LandingPage from './LandingaPage';

const HomePage = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  return (
    <>
    <div>
        <Navbar />
        {isHomePage && <LandingPage />}
        <Outlet />
    </div>
    </>
  )
}

export default HomePage
