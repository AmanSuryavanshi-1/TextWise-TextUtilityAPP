import React from 'react'
import Navbar from '../Components/Navbar';
import { Outlet, useLocation } from 'react-router-dom';
import LandingPage from './LandingaPage';

const HomePage = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  return (
    <>
        <Navbar />
        {isHomePage && <LandingPage />}
        <Outlet />
    </>
  )
}

export default HomePage
