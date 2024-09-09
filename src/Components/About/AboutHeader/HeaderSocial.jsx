import React from 'react';
import { BsLinkedin } from 'react-icons/bs';
import { FaGithub, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const HeaderSocial = () => {
  return (
    <div className="flex justify-center gap-6 mb-4 md:grid header_socials md:justify-start md:mb-0">
      <Link to="https://www.linkedin.com/in/amansuryavanshi/" target="_blank" rel="noreferrer"
       className="text-2xl text-bgVariant"> <BsLinkedin />
       </Link>

      <Link to="https://github.com/AmanSuryavanshi-1" target="_blank" rel="noreferrer"
       className="text-2xl text-bgVariant"> <FaGithub />
       </Link>

      <Link to="https://www.instagram.com/__aman_suryavanshi__/" target="_blank" rel="noreferrer"
       className="text-2xl text-bgVariant"> <FaInstagram />
       </Link>
    </div>
  );
}

export default HeaderSocial;
