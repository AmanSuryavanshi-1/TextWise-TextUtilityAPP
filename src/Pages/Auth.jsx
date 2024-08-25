import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';

const Auth = () => {
  const [isActive, setIsActive] = useState(false);

  const handleSubmit = (e, formType) => {
    e.preventDefault();
    console.log(`${formType} form submitted`);
  };

  return (
    <div className="flex mb-8 items-center justify-center h-[90%] p-4 font-sans bg-bg">
      <div className={`relative mt-5 overflow-hidden bg-primary rounded-3xl shadow-custom w-full max-w-[768px] min-h-[480px] ${isActive ? 'active' : ''}`}>
        <div className="absolute top-0 w-full h-full transition-all ease-in-out duration-400">
          
          {/* Sign Up Form */}
          <div className={`absolute top-0 h-full transition-all duration-400 ease-in-out ${isActive ? 'translate-x-0 opacity-100 z-20' : 'translate-x-full opacity-0 z-10'} w-1/2 right-0`}>
            <form onSubmit={(e) => handleSubmit(e, 'signup')} className="flex flex-col items-center justify-center h-full px-6 bg-primary sm:px-10 max-md:px-2">
              <h1 className="mb-4 font-serif text-2xl font-bold text-white max-md:text-xl">Create Account</h1>
              <div className="w-full mt-4">
                <button className="flex items-center justify-center w-full px-4 py-2 text-xs font-medium transition-colors bg-white border rounded-lg duration-400 shadow-custom text-text-color border-bg hover:bg-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bg max-md:px-1">
                  <FcGoogle className="mr-2" /> <span>Continue with Google</span>
                </button>
              </div>
              <span className="my-4 text-sm text-center text-white max-md:text-xs">or use your email for registration</span>
              <input type="text" placeholder="Name" className="w-full px-4 py-2 mb-2 text-sm text-white border-none rounded-lg outline-none bg-bg-variant" />
              <input type="email" placeholder="Email" className="w-full px-4 py-2 mb-2 text-sm text-white border-none rounded-lg outline-none bg-bg-variant" />
              <input type="password" placeholder="Password" className="w-full px-4 py-2 mb-2 text-sm text-white border-none rounded-lg outline-none bg-bg-variant" />
              <button type="submit" className="px-12 py-3 mt-4 text-xs font-semibold tracking-wide uppercase transition-colors rounded-lg cursor-pointer duration-400 text-text-color bg-bg hover:bg-bg-variant">Sign Up</button>
            </form>
          </div>

          {/* Sign In Form */}
          <div className={`absolute top-0 h-full transition-all duration-400 ease-in-out ${isActive ? '-translate-x-full opacity-0' : 'translate-x-0 opacity-100 z-20'} left-0 w-1/2`}>
            <form onSubmit={(e) => handleSubmit(e, 'signin')} className="flex flex-col items-center justify-center h-full px-6 bg-primary sm:px-10 max-md:px-2">
              <h1 className="mb-4 font-serif text-2xl font-bold text-white max-md:text-xl">Sign In</h1>
              <div className="w-full mt-4">
                <button className="flex items-center justify-center w-full px-4 py-2 text-xs font-medium transition-colors bg-white border rounded-lg duration-400 shadow-custom text-text-color border-bg hover:bg-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bg max-md:px-1">
                  <FcGoogle className="mr-2" /> <span>Continue with Google</span>
                </button>
              </div>
              <span className="my-4 text-sm text-center text-white max-md:text-xs">or use your email password</span>
              <input type="email" placeholder="Email" className="w-full px-4 py-2 mb-2 text-sm text-white border-none rounded-lg outline-none bg-bg-variant" />
              <input type="password" placeholder="Password" className="w-full px-4 py-2 mb-2 text-sm text-white border-none rounded-lg outline-none bg-bg-variant" />
              <a href="#" className="my-2 text-sm transition-colors duration-400 text-bg-variant hover:text-light">Forgot Your Password?</a>
              <button type="submit" className="px-12 py-3 mt-4 text-xs font-semibold tracking-wide uppercase transition-colors rounded-lg cursor-pointer duration-400 text-text-color bg-bg hover:bg-bg-variant">Sign In</button>
            </form>
          </div>
        </div>

        {/* Toggle Container */}
        <div className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-all duration-400 ease-in-out ${isActive ? '-translate-x-full rounded-r-[150px]' : 'rounded-l-[150px]'} z-50`}>
          <div className={`bg-gradient-to-r from-bg to-bg-variant text-text-color relative -left-full h-full w-[200%] ${isActive ? 'translate-x-1/2' : 'translate-x-0'} transition-all duration-400 ease-in-out`}>
            <div className={`absolute flex flex-col items-center justify-center px-8 text-center top-0 h-full w-1/2 ${isActive ? 'translate-x-0' : '-translate-x-[200%]'} transition-all duration-400 ease-in-out max-md:px-2`}>
              <h1 className="mb-2 font-serif text-2xl font-bold max-md:text-xl">Welcome Back!</h1>
              <p className="mb-4 text-sm max-md:text-xs">Enter your personal details to use all of site features</p>
              <button onClick={() => setIsActive(false)} className="px-12 py-3 text-xs font-semibold tracking-wide uppercase transition-colors bg-transparent border rounded-lg cursor-pointer duration-400 text-text-color border-text-color hover:bg-white hover:text-bg" >Sign In</button>
            </div>
            <div className={`absolute flex flex-col items-center justify-center px-8 text-center top-0 right-0 h-full w-1/2 ${isActive ? 'translate-x-[200%]' : 'translate-x-0'} transition-all duration-400 ease-in-out max-md:px-2`}>
              <h1 className="mb-2 font-serif text-2xl font-bold max-md:text-xl">Hello, Friend!</h1>
              <p className="mb-4 text-sm max-md:text-xs">Register with your personal details to use all of site features</p>
              <button onClick={() => setIsActive(true)} className="px-12 py-3 text-xs font-semibold tracking-wide uppercase transition-colors bg-transparent border rounded-lg cursor-pointer duration-400 text-text-color border-text-color hover:bg-white hover:text-bg">Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;