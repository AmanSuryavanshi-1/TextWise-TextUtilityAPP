import React from 'react';
import logo from '../../assets/logo.png';
import meLogo from '../../assets/ASlogo.png';
import { BsLinkedin } from 'react-icons/bs';
import { FaGithub, FaInstagram } from 'react-icons/fa';
import { LiaInfoSolid } from 'react-icons/lia';
import { IoCallOutline, IoHomeOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { IoIosContact } from "react-icons/io";

const Footer = () => {
  return (
    <footer className="py-12 text-center text-white bg-bg">
      <div className="flex justify-center mb-16 space-x-4">
        <img src={meLogo} loading="lazy" alt="Main Logo" className="object-contain w-16 h-16 filter brightness-0 invert" />
        <img src={logo} loading='lazy' alt="Logo" className="object-contain w-16 h-16 filter brightness-0 invert" />
      </div>

      <ul className="flex flex-wrap justify-center gap-10 mb-16">
        <Link to="/" className='flex items-center'>
          <li className="flex items-center font-sans text-white transition-colors duration-300 hover:text-primary">
            <IoHomeOutline className="w-6 h-6 mr-1" /> Home
          </li>
        </Link>
        <Link to="/about" className='flex items-center'>
          <li className="flex items-center font-sans text-white transition-colors duration-300 hover:text-primary">
            <LiaInfoSolid className="w-6 h-6 mr-1" /> About
          </li>
        </Link>
        <Link to="https://aman-suryavanshi-portfolio.netlify.app/" className='flex items-center'>
          <li className="flex items-center font-sans text-white transition-colors duration-300 hover:text-primary">
            <IoIosContact className="w-6 h-6 mr-1" /> Portfolio
          </li>
        </Link>
        <Link to="/contact" className='flex items-center'>
          <li className="flex items-center font-sans text-white transition-colors duration-300 hover:text-primary">
            <IoCallOutline className="w-6 h-6 mr-1" /> Contact
          </li>
        </Link>
      </ul>

      <div className="flex justify-center mb-8 space-x-6">
        <Link to="https://www.linkedin.com/in/amansuryavanshi/" className="p-4 transition-all duration-300 border border-transparent rounded-xl bg-bgVariant social-icon hover:bg-primary hover:border-white">
          <BsLinkedin className="text-lg text-white" />
        </Link>
        <Link to="https://github.com/AmanSuryavanshi-1" className="p-4 transition-all duration-300 border border-transparent rounded-xl bg-bgVariant social-icon hover:bg-primary hover:border-white">
          <FaGithub className="text-lg text-white" />
        </Link>
        <Link to="https://www.instagram.com/__aman_suryavanshi__/" className="p-4 transition-all duration-300 border border-transparent rounded-xl bg-bgVariant social-icon hover:bg-primary hover:border-white">
          <FaInstagram className="text-lg text-white" />
        </Link>
      </div>

      <div className="text-sm text-white">
        <small>&copy; AMAN SURYAVANSHI. All rights reserved.</small>
      </div>
    </footer>
  );
}

export default Footer;