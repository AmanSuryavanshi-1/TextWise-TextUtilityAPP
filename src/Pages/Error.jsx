import React from "react";
import { Link, useRouteError } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";

const Error = () => {
  const err = useRouteError();
  console.log(err);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-bg via-bg-variant to-primary-variant">
      <div className="p-10 text-center transition transform bg-white duration-400 shadow-custom rounded-2xl hover:scale-105">
        <div className="flex justify-center mb-4">
          <AiOutlineHome className="w-16 h-16 text-bg animate-bounce" />
        </div>
        <h1 className="mb-4 font-serif text-6xl font-bold text-bg">OOPS!!!</h1>
        <h2 className="mb-2 text-2xl font-semibold text-bg-variant">Something went wrong</h2>
        <h3 className="mb-4 text-lg text-bg-variant">Check URL path again</h3>
        <h4 className="mb-6 text-lg text-bg-variant">
          {err.status}: {err.statusText}
        </h4>
        <button className="px-6 py-2 text-white transition rounded-full duration-400 shadow-custom bg-bg hover:bg-bg-variant">
          <Link to="/" className="flex items-center"> 
            <AiOutlineHome className="w-5 h-5 mr-2" /> 
            Go Back Home
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Error;