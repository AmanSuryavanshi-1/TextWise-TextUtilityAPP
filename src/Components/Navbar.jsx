import React, { useState } from "react";
import logo from '../../assets/logo.png';
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaTimes, FaHome, FaEdit, FaEnvelope, FaExclamationCircle, FaUser, FaInfoCircle } from 'react-icons/fa';

const NavItem = ({ to, icon: Icon, children }) => (
  <NavLink 
    to={to} 
    className={({ isActive }) => 
      `flex items-center px-3 py-2 text-sm font-medium transition-colors duration-200
      ${isActive 
        ? 'text-white bg-bgVariant rounded-md' 
        : 'text-primary hover:text-white hover:bg-bgVariant/50 rounded-md'
      }`
    }
  >
    <Icon className="w-4 h-4 mr-2" />
    {children}
  </NavLink>
);

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-bg h-[8vh] px-4 sticky top-0 z-[999] shadow-md">
            <div className="flex items-center justify-between h-full mx-auto max-w-7xl">
                <div className="flex items-center space-x-4">
                    <Link to="/" className="flex items-center">
                        <img className="w-10 h-10 brightness-200 contrast-200" src={logo} alt="TextWise Logo" />
                    </Link>
                    <div className="items-center hidden space-x-1 md:flex">
                        <NavItem to="/" icon={FaHome}>Home</NavItem>
                        <NavItem to="/about" icon={FaInfoCircle}>About</NavItem>
                        <NavItem to="/layout" icon={FaEdit}>Editor</NavItem>
                    </div>
                </div>

                <div className="hidden font-serif text-base font-bold md:block text-primary">
                    Note Taking & Editing WebApp
                </div>
                
                <div className="items-center hidden space-x-1 md:flex">
                    <NavItem to="/contact" icon={FaEnvelope}>Contact</NavItem>
                    <NavItem to="/issue" icon={FaExclamationCircle}>Issue</NavItem>
                    <NavItem to="/auth" icon={FaUser}>Account</NavItem>
                </div>

                <button 
                    className="transition-colors duration-200 md:hidden text-primary hover:text-white"
                    onClick={toggleMenu}
                >
                    {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                </button>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="mt-2 overflow-hidden rounded-lg shadow-lg md:hidden bg-bgVariant">
                    <div className="flex flex-col py-2">
                        <NavItem to="/" icon={FaHome} onClick={toggleMenu}>Home</NavItem>
                        <NavItem to="/about" icon={FaInfoCircle} onClick={toggleMenu}>About</NavItem>
                        <NavItem to="/layout" icon={FaEdit} onClick={toggleMenu}>Editor</NavItem>
                        <NavItem to="/contact" icon={FaEnvelope} onClick={toggleMenu}>Contact</NavItem>
                        <NavItem to="/issue" icon={FaExclamationCircle} onClick={toggleMenu}>Issue</NavItem>
                        <NavItem to="/auth" icon={FaUser} onClick={toggleMenu}>Account</NavItem>
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navbar;