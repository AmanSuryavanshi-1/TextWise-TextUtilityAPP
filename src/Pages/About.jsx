import React from 'react'
import Header from '../Components/About/AboutHeader/Header';
import AboutMe from '../Components/About/AboutMe';
import GithubProfile from '../Components/About/GithubProfile'; 
import GithubCalendar from '../Components/About/GithubCalendar';
import Footer from '../Components/Footer';
// import NotionPage from '../Components/NotionPage';
const About = () => {
  
  return (
        <div className='bg-primaryVariant'>
          <Header />
          <AboutMe />
        <GithubProfile />
        <GithubCalendar />
        <Footer/>
      </div>
  );
};

export default About;