import React from 'react';
import { Link } from "react-router-dom";
import { FaEdit, FaFileAlt, FaCamera, FaHeadphones, FaGlobe, FaYoutube } from 'react-icons/fa';
import Footer from '../Components/Footer';

// Importing images
import editor from '../../Assets/Editor.jpg';
import notes from '../../Assets/Notes.jpg';
import summarizer from '../../Assets/Summarizer.jpg';
import transcribe from '../../Assets/transcribe.jpg';
import transliteration from '../../Assets/Transliteration.jpg';
import youtube from '../../Assets/Youtube.jpg';


const LandingPage = () => {
  const cards = [
    { 
      imgSrc: editor, 
      alt: "Playground", 
      title: "Playground", 
      description: "Experience a versatile text editor with a collaborative whiteboard.", 
      icon: <FaEdit className="w-6 h-6 mb-4 text-primary" />,
      link: "/layout/editor"
    },
    { 
      imgSrc: notes, 
      alt: "User Notes", 
      title: "User Notes", 
      description: "Create, edit, and enhance your notes with our intuitive text editor.", 
      icon: <FaFileAlt className="w-6 h-6 mb-4 text-primary" />,
      link: "/layout/notes"
    },
    { 
      imgSrc: summarizer, 
      alt: "Summarization", 
      title: "Summarization", 
      description: "Summarize large texts quickly and efficiently.", 
      icon: <FaCamera className="w-6 h-6 mb-4 text-primary" />,
      link: "/layout/summarizer"
    },
    { 
      imgSrc: transcribe, 
      alt: "Transcription", 
      title: "Transcription", 
      description: "Transcribe speech to text and vice versa with ease.", 
      icon: <FaHeadphones className="w-6 h-6 mb-4 text-primary" />,
      link: "/layout/stt"
    },
    { 
      imgSrc: transliteration, 
      alt: "Transliteration", 
      title: "Transliteration", 
      description: "Convert text between different languages seamlessly.", 
      icon: <FaGlobe className="w-6 h-6 mb-4 text-primary" />,
      link: "/layout/transliteration"
    },
    { 
      imgSrc: youtube, 
      alt: "Youtube Summarizer", 
      title: "Youtube Summarizer", 
      description: "Summarize YouTube videos for quick understanding.", 
      icon: <FaYoutube className="w-6 h-6 mb-4 text-primary" />,
      link: "/layout/summarizer"  // Assuming YouTube summarizer is part of the general summarizer
    },
    { 
      imgSrc: youtube, 
      alt: "Text Toolkit", 
      title: "Text Toolkit", 
      description: "Enhance the Text using the Toolkit provide by TextWise.", 
      icon: <FaYoutube className="w-6 h-6 mb-4 text-primary" />,
      link: "/layout/summarizer"  // Assuming YouTube summarizer is part of the general summarizer
    },
  ];

  return (
    <div className="min-h-screen text-white bg-gradient-to-b from-bg to-bgVariant">
      <div className="p-8 mx-auto max-w-container-lg">
        <header className="mb-12 text-center">
          <h1 className="font-serif text-5xl leading-tight text-primary">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primaryVariant">TextWise</span>
          </h1>
          <p className="mt-6 text-lg text-light">Unlock the power of text with our versatile toolset</p>
        </header>

        <div className="grid grid-cols-1 gap-8 mb-12 sm:grid-cols-2 md:grid-cols-3">
          {cards.map((card, index) => (
            <Link 
              key={index} 
              to={card.link}
              className="flex flex-col items-center p-6 text-center transition-all bg-white border border-gray-300 rounded-lg cursor-pointer duration-400 shadow-custom hover:shadow-lg group"
            >
              <div className="relative w-full h-48 mb-4 overflow-hidden rounded-lg">
                <img src={card.imgSrc} alt={card.alt} className="object-cover w-full h-full transition-transform duration-400 group-hover:scale-105" />
                <div className="absolute inset-0 flex items-center justify-center transition-opacity bg-black bg-opacity-50 opacity-0 duration-400 group-hover:opacity-100">
                  {card.icon}
                </div>
              </div>
              <h2 className="font-serif text-2xl text-textColor group-hover:text-primary">{card.title}</h2>
              <p className="mt-2 text-textColor">{card.description}</p>
            </Link>
          ))}
        </div>

        <div className="flex justify-center mt-16">
          <Link to="/layout" className="px-8 py-4 text-lg font-semibold text-white transition-all transform rounded-lg duration-400 shadow-custom bg-primary hover:bg-primaryVariant hover:shadow-lg hover:scale-105">
            Get Started
          </Link>
        </div>

        <div className="flex justify-center mt-16">
          <div className="flex flex-col items-center w-full p-8 text-center rounded-lg shadow-custom bg-bgVariant md:w-1/3">
            <h3 className="mb-4 font-serif text-2xl text-primary">Welcome Back</h3>
            <p className="mb-6 text-sm text-light">Access your account to continue using TextWise.</p>
            <Link to="/auth" className="w-full py-2 text-white transition-all rounded-lg duration-400 bg-primary hover:bg-primaryVariant">
              Login / Sign Up
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LandingPage;