import React from 'react'
import img from '../../../assets/AS main.png'; 
import { FaAward, FaComments } from 'react-icons/fa';
import { FiUsers } from 'react-icons/fi';
import { VscFolderLibrary } from 'react-icons/vsc';
import { Link } from 'react-router-dom';

const AboutMe = () => {
  return (
    <div className="flex items-center justify-center h-full mx-2 mb-4 sm:mx-8">
      <div className="w-full max-w-6xl px-2 mx-2 sm:px-4 sm:mx-12">
        <h5 className="mb-2 text-xs text-center uppercase text-bgVariant">Get To Know</h5>
        <h2 className="mb-4 font-serif text-2xl font-bold text-center sm:mb-8 sm:text-3xl text-bg">About Me</h2>

        <div className="grid items-center grid-cols-1 gap-4 md:grid-cols-2">
          <div className="relative flex items-center justify-center mb-4">
            <div className="absolute shadow-lg shadow-bgVariant w-56 sm:w-72 h-48 sm:h-64 bg-bg rounded-2xl transform transition duration-300 hover:rotate-[-10deg]"></div>
            <div className="w-56 sm:w-72 h-48 sm:h-64 overflow-hidden transform rotate-[-8deg] duration-300 bg-bg shadow-lg rounded-2xl transition hover:rotate-0">
              <img src={img} loading='eager' alt="AboutImage" className="object-cover w-full h-full" />
            </div>
          </div>

          <div className="about_content">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              <article className="p-4 sm:p-6 text-center transition-all text-primaryVariant duration-300 border-2 rounded-2xl shadow-md shadow-bgVariant bg-bg border-white hover:shadow-sm hover:shadow-primary hover:text-bg hover:bg-white hover:border-bg transform hover:translate-y-[-10px]">
                <FaAward className="mx-auto mb-2 text-2xl sm:text-3xl" />
                <h5 className="mb-2 font-serif text-base font-bold sm:text-lg">Experience</h5>
                <small className="text-xs">1+ Years Working</small>
              </article>

              <article className="p-4 sm:p-6 text-center transition-all text-primaryVariant duration-300 border-2 rounded-2xl shadow-md shadow-bgVariant bg-bg border-white hover:shadow-sm hover:shadow-primary hover:text-bg hover:bg-white hover:border-bg transform hover:translate-y-[-10px]">
                <FiUsers className="mx-auto mb-2 text-2xl sm:text-3xl text-primary-yellow" />
                <h5 className="mb-2 font-serif text-base font-bold sm:text-lg text-primary-light">Worked With</h5>
                <small className="text-xs text-primary-white">2+ Companies</small>
              </article>

              <article className="p-4 sm:p-6 text-center transition-all text-primaryVariant duration-300 border-2 rounded-2xl shadow-md shadow-bgVariant bg-bg border-white hover:shadow-sm hover:shadow-primary hover:text-bg hover:bg-white hover:border-bg transform hover:translate-y-[-10px]">
                <VscFolderLibrary className="mx-auto mb-2 text-2xl sm:text-3xl text-primary-yellow" />
                <h5 className="mb-2 font-serif text-base font-bold sm:text-lg text-primary-light">Projects</h5>
                <small className="text-xs text-primary-white">35+ Completed</small>
              </article>
            </div>

            <div className="flex justify-center mt-6 sm:mt-8">
            <Link
              to="/contact"
              className="inline-flex items-center px-6 py-2 font-semibold transition-all duration-300 border-2 rounded-full shadow-lg text-bg border-bg bg-primary hover:bg-primaryVariant hover:text-bg hover:scale-105 focus:outline-none"
            >
              <FaComments className="w-5 h-5 mr-2" />
              <span>Let's Talk</span>
            </Link>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <p className="max-w-6xl my-6 text-base leading-6 text-justify sm:my-10 sm:text-lg sm:leading-7 text-primary-light">
            Hi, I'm a web developer and UI/UX designer with a passion for creating beautiful, functional, and user-centered digital experiences. I am always looking for new and innovative ways to bring my visions to life. I believe that design is about more than just making things look pretty - it's about solving problems and creating intuitive, enjoyable experiences for users. Whether I'm working on a website or a mobile app, I bring my commitment to design excellence and user-centered thinking to every project I work on. I look forward to the opportunity to bring my skills and passion to the next project.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AboutMe