import React from 'react';
import { Link } from 'react-router-dom';
import { BsLinkedin } from 'react-icons/bs';
import { FaGithub, FaInstagram } from 'react-icons/fa';
import { LiaInfoSolid } from 'react-icons/lia';
import { IoCallOutline, IoHomeOutline } from 'react-icons/io5';
import { IoIosContact } from "react-icons/io";

// Assume these imports are correct
import logo from '../../assets/logo.png';
import meLogo from '../../assets/ASlogo.png';

const Footer = () => {
  return (
    <footer className="py-12 text-white bg-bg">
      <div className="container px-4 mx-auto">
        <div className="flex justify-center mb-16 space-x-4">
          <img src={meLogo} loading="lazy" alt="Main Logo" className="object-contain w-16 h-16 filter brightness-0 invert" />
          <img src={logo} loading='lazy' alt="Logo" className="object-contain w-16 h-16 filter brightness-0 invert" />
        </div>

        <ul className="flex flex-wrap justify-center gap-10 mb-16">
          <FooterLink to="/" icon={<IoHomeOutline className="w-6 h-6 mr-2" />} text="Home" />
          <FooterLink to="/about" icon={<LiaInfoSolid className="w-6 h-6 mr-2" />} text="About" />
          <FooterLink to="https://aman-suryavanshi-portfolio.netlify.app/" icon={<IoIosContact className="w-6 h-6 mr-2" />} text="Portfolio" />
          <FooterLink to="/contact" icon={<IoCallOutline className="w-6 h-6 mr-2" />} text="Contact" />
        </ul>

        <div className="flex justify-center mb-8 space-x-6">
          <SocialLink to="https://www.linkedin.com/in/amansuryavanshi/" icon={<BsLinkedin className="text-xl" />} />
          <SocialLink to="https://github.com/AmanSuryavanshi-1" icon={<FaGithub className="text-xl" />} />
          <SocialLink to="https://www.instagram.com/__aman_suryavanshi__/" icon={<FaInstagram className="text-xl" />} />
        </div>

        <div className="text-sm text-center text-white">
          <small>&copy; AMAN SURYAVANSHI. All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
}

const FooterLink = ({ to, icon, text }) => (
  <Link to={to} className='group'>
    <li className="flex items-center font-sans text-white transition-colors duration-300 group-hover:text-primary">
      {React.cloneElement(icon, { className: `${icon.props.className} group-hover:text-primary` })}
      <span className="group-hover:text-primary">{text}</span>
    </li>
  </Link>
);

const SocialLink = ({ to, icon }) => (
  <Link to={to} className="p-4 transition-all duration-300 border-2 border-transparent rounded-xl bg-bgVariant hover:bg-primary hover:border-white group">
    {React.cloneElement(icon, { className: `${icon.props.className} text-white group-hover:text-bg` })}
  </Link>
);

export default Footer;