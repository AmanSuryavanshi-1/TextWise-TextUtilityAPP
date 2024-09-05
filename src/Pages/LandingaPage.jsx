import React from 'react';
import { Link } from "react-router-dom";
import { FaEdit, FaFileAlt, FaCamera, FaHeadphones, FaGlobe, FaYoutube, FaTools, FaArrowRight } from 'react-icons/fa';
import Footer from '../Components/Footer';

// Importing images
import editor from '../../Assets/Editor.jpg';
import notes from '../../Assets/Notes.jpg';
import summarizer from '../../Assets/Summarizer.jpg';
import transcribe from '../../Assets/transcribe.jpg';
import transliteration from '../../Assets/Transliteration.jpg';
import youtube from '../../Assets/Youtube.jpg';
import TextToolkit from '../../Assets/TextToolkit.jpeg';

const LandingPage = () => {
  const cards = [
    { 
      imgSrc: editor, 
      alt: "Playground", 
      title: "Playground", 
      description: "Experience a versatile text editor combined with a collaborative whiteboard. Easily create, edit, and brainstorm ideas in real-time with your team.", 
      icon: <FaEdit className="mb-4 text-4xl text-primary" />,
      link: "/layout/editor"
    },
    { 
      imgSrc: notes, 
      alt: "User Notes", 
      title: "User Notes", 
      description: "Effortlessly create, organize, and format your notes using our user-friendly text editor. Save time by organizing your thoughts in structured documents.", 
      icon: <FaFileAlt className="mb-4 text-4xl text-primary" />,
      link: "/layout/notes"
    },
    { 
      imgSrc: summarizer, 
      alt: "Summarization", 
      title: "Summarization", 
      description: "Quickly extract key insights from long texts with our advanced summarization tool. Designed to save time and distill large amounts of information.", 
      icon: <FaCamera className="mb-4 text-4xl text-primary" />,
      link: "/layout/summarizer"
    },
    { 
      imgSrc: transcribe, 
      alt: "Transcription", 
      title: "Transcription", 
      description: "Convert spoken words into text and vice versa seamlessly. Perfect for creating transcripts of meetings, interviews, or lectures.", 
      icon: <FaHeadphones className="mb-4 text-4xl text-primary" />,
      link: "/layout/stt"
    },
    { 
      imgSrc: transliteration, 
      alt: "Transliteration", 
      title: "Transliteration", 
      description: "Easily convert text between different languages while preserving the meaning and readability. Break down language barriers effortlessly.", 
      icon: <FaGlobe className="mb-4 text-4xl text-primary" />,
      link: "/layout/transliteration"
    },
    { 
      imgSrc: youtube, 
      alt: "Youtube Summarizer", 
      title: "Youtube Summarizer", 
      description: "Summarize YouTube videos in seconds. Get the key points and insights from any video without watching the full content.", 
      icon: <FaYoutube className="mb-4 text-4xl text-primary" />,
      link: "/layout/summarizer"
    },
    { 
      imgSrc: TextToolkit, 
      alt: "Text Toolkit", 
      title: "Text Toolkit", 
      description: "Enhance your text using our comprehensive toolkit. Perform actions such as converting text case, copying, replacing, and clearing text efficiently.", 
      icon: <FaTools className="mb-4 text-4xl text-primary" />,
      link: "/layout/text-toolkit"
    },
  ];

  return (
    <div className="min-h-screen text-dark bg-gradient-to-b from-primaryVariant to-primary">
      <div className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <header className="mb-16 text-center">
          <h1 className="font-serif text-4xl font-bold leading-tight text-bg sm:text-6xl lg:text-7xl">
            Welcome to TextWise
          </h1>
          <p className="mt-6 font-serif text-base font-extrabold text-white">Unlock the power of text with our versatile Toolkit</p>
        </header>

        <div className="grid grid-cols-1 gap-8 mt-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {cards.map((card, index) => (
            <Link 
              key={index} 
              to={card.link}
              className="flex flex-col overflow-hidden transition-all bg-white border-2 duration-400 border-bg rounded-xl shadow-custom hover:shadow-lg group hover:scale-105"
            >
              <div className="relative h-48 overflow-hidden">
                <img src={card.imgSrc} alt={card.alt} className="object-cover w-full h-full transition-transform duration-400 group-hover:scale-110" />
                <div className="absolute inset-0 flex items-center justify-center transition-opacity opacity-0 bg-bg bg-opacity-80 group-hover:opacity-100">
                  {card.icon}
                </div>
              </div>
              <div className="flex flex-col flex-grow p-6">
                <h2 className="mb-3 font-serif text-2xl font-semibold text-bg group-hover:text-bgVariant">{card.title}</h2>
                <p className="flex-grow text-sm text-dark">{card.description}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex flex-col items-center justify-center mt-20 mb-20 space-y-10 sm:space-y-12">
          <div className="w-full max-w-md px-12 py-8 text-center bg-white rounded-3xl shadow-custom">
            <h3 className="mb-3 font-serif text-2xl font-semibold text-bg">Welcome Back</h3>
            <p className="mb-6 text-base text-dark">Access your account to continue using TextWise.</p>
            <Link to="/auth" className="inline-block py-2 my-2 text-base font-medium transition-all duration-300 bg-white border-2 rounded-full px-7 text-bg border-bg hover:bg-bg hover:text-white">
              Login / Sign Up
            </Link>
          </div>

          <Link to="/layout" className="w-full sm:max-w-xs">
            <button className="relative inline-flex items-center justify-center w-full px-6 py-3 overflow-hidden text-lg font-medium text-white transition duration-300 ease-out border-2 rounded-full shadow-md border-bg group hover:bg-bg">
              <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-bgVariant group-hover:translate-x-0 ease">
                <FaArrowRight className="w-6 h-6" />
              </span>
              <span className="absolute flex items-center justify-center w-full h-full font-bold transition-all duration-300 transform text-bg group-hover:translate-x-full ease group-hover:text-white">Get Started</span>
              <span className="relative invisible">Get Started</span>
            </button>
          </Link>
        </div>
          
      </div>

      <Footer />
    </div>
  );
};

export default LandingPage;