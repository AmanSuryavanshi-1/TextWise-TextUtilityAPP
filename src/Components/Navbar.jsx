import React from "react";
import logo from '../../assets/main logo.png';
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="bg-primary h-[5.5vh] py-2 px-2 flex items-center justify-between font-['Source_Sans_Pro'] text-[0.85rem] border-b border-white sticky top-0 z-[999]">
            <Link to="/" className="logo">
                <img className="h-[22px] w-[25px]" src={logo} alt="" />
            </Link>
            
            <div className="items flex ml-2 font-['Poppins']">
                <NavLink to="/" exact className="px-2 cursor-pointer text-bg">Home</NavLink>
                <NavLink to="/layout" className="px-2 cursor-pointer text-bg max-md:hidden">Editor</NavLink>
                <NavLink to="/contact" className="px-2 cursor-pointer text-bg">Contact</NavLink>
                <NavLink to="/issue" className="px-2 cursor-pointer text-bg max-md:hidden">Issue</NavLink>
            </div>

            <p className="title font-['Cinzel'] text-bg mx-auto text-center font-bold max-md:hidden">
                TextWise - Note Taking & Editing WebApp
            </p>
            
            <div className="userLog font-['Poppins']">
                <NavLink to="/auth" className="px-2 cursor-pointer LogIn text-bg">Auth</NavLink>
                {/* <NavLink to="/signup" className="px-2 cursor-pointer SignUp text-bg">SignUp</NavLink> */}
            </div>
        </div>
    )
}

export default Navbar;