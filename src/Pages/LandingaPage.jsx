import React from 'react';
import { Link } from "react-router-dom";
import { FaEdit, FaFileAlt, FaCamera, FaHeadphones, FaGlobe, FaYoutube, FaTools, FaArrowRight, FaUser } from 'react-icons/fa';
import Footer from '../Components/Footer';

// Importing images
import editor from '../../Assets/Editor.jpg';
import notes from '../../Assets/Notes.jpg';
import summarizer from '../../Assets/Summarizer.jpg';
import transcribe from '../../Assets/transcribe.jpg';
import transliteration from '../../Assets/Transliteration.jpg';
import youtube from '../../Assets/Youtube.jpg';
import TextToolkit from '../../Assets/TextToolkit.jpeg';
import RepoData from '../Components/About/RepoData';

const LandingPage = () => {
  const cards = [
    { 
      imgSrc: editor, 
      alt: "Playground", 
      title: "Playground", 
      description: "Experience a versatile text editor combined with a collaborative whiteboard. Easily create, edit, and brainstorm ideas in real-time with your team.", 
      icon: <FaEdit className="mb-4 text-4xl text-primaryVariant" />,
      link: "/layout/editor"
    },
    { 
      imgSrc: notes, 
      alt: "User Notes", 
      title: "User Notes", 
      description: "Effortlessly create, organize, and format your notes using our user-friendly text editor. Save time by organizing your thoughts in structured documents.", 
      icon: <FaFileAlt className="mb-4 text-4xl text-primaryVariant" />,
      link: "/layout/notes"
    },
    { 
      imgSrc: summarizer, 
      alt: "Summarization", 
      title: "Summarization", 
      description: "Quickly extract key insights from long texts with our advanced summarization tool. Designed to save time and distill large amounts of information.", 
      icon: <FaCamera className="mb-4 text-4xl text-primaryVariant" />,
      link: "/layout/summarizer"
    },
    { 
      imgSrc: transcribe, 
      alt: "Transcription", 
      title: "Transcription", 
      description: "Convert spoken words into text and vice versa seamlessly. Perfect for creating transcripts of meetings, interviews, or lectures.", 
      icon: <FaHeadphones className="mb-4 text-4xl text-primaryVariant" />,
      link: "/layout/stt"
    },
    { 
      imgSrc: transliteration, 
      alt: "Transliteration", 
      title: "Transliteration", 
      description: "Easily convert text between different languages while preserving the meaning and readability. Break down language barriers effortlessly.", 
      icon: <FaGlobe className="mb-4 text-4xl text-primaryVariant" />,
      link: "/layout/transliteration"
    },
    { 
      imgSrc: youtube, 
      alt: "Youtube Summarizer", 
      title: "Youtube Summarizer", 
      description: "Summarize YouTube videos in seconds. Get the key points and insights from any video without watching the full content.", 
      icon: <FaYoutube className="mb-4 text-4xl text-primaryVariant" />,
      link: "/layout/summarizer"
    },
    { 
      imgSrc: TextToolkit, 
      alt: "Text Toolkit", 
      title: "Text Toolkit", 
      description: "Enhance your text using our comprehensive toolkit. Perform actions such as converting text case, copying, replacing, and clearing text efficiently.", 
      icon: <FaTools className="mb-4 text-4xl text-primaryVariant" />,
      link: "/layout/text-toolkit"
    },
  ];

  return (
    <div className="min-h-screen text-white bg-bg">
      <div className="px-4 py-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <header className="mb-2 text-center">
          <h1 className="font-serif text-5xl tracking-wide text-white sm:text-5xl lg:text-5xl">
            Welcome To TextWise
          </h1>
          <p className="mt-4 font-sans text-base text-white">Unlock the power of text with our versatile Toolkit</p>
        </header>

        <div className="grid grid-cols-1 gap-8 mx-12 mt-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {cards.map((card, index) => (
            <Link 
              key={index} 
              to={card.link}
              className="flex flex-col overflow-hidden transition-all duration-300 bg-white rounded-lg hover:shadow-xl group hover:scale-105"
            >
              <div className="relative h-48 overflow-hidden">
                <img src={card.imgSrc} alt={card.alt} className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110" />
                <div className="absolute inset-0 flex items-center justify-center transition-opacity opacity-0 bg-bg bg-opacity-80 group-hover:opacity-100">
                  {card.icon}
                </div>
              </div>
              <div className="flex flex-col flex-grow p-6">
                <h2 className="mx-auto mb-3 font-serif text-2xl text-primaryVariant group-hover:text-bg">{card.title}</h2>
                <p className="flex-grow font-sans text-sm text-primaryVariant">{card.description}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex flex-col items-center justify-center my-20 space-y-10 sm:space-y-12">
          <div className="w-full max-w-md px-12 py-8 text-center bg-white border-2 shadow-lg rounded-3xl border-bgVariant">
            <h3 className="mb-3 font-serif text-2xl font-semibold text-primaryVariant">Welcome Back</h3>
            <p className="mb-6 text-base text-bg">Access your account to continue using TextWise.</p>
            <Link to="/auth" className="inline-flex items-center px-6 py-2 mt-2 font-semibold text-white transition-all duration-300 rounded-full bg-primaryVariant hover:bg-bg">
              <FaUser className="mr-2" />
              Access Account
            </Link>
          </div>

          <Link to="/layout" className="w-full sm:max-w-xs">
            <button className="relative inline-flex items-center justify-center w-full px-6 py-3 overflow-hidden text-lg text-white transition duration-300 ease-out border-2 border-white rounded-full shadow-md bg-bgVariant group hover:bg-bg hover:text-white">
              <span className="absolute inset-0 flex items-center justify-center w-full h-full duration-300 -translate-x-full bg-primaryVariant group-hover:translate-x-0 ease">
                <FaArrowRight className="w-6 h-6" />
              </span>
              <span className="absolute flex items-center justify-center w-full h-full font-serif font-bold tracking-wide transition-all duration-300 transform group-hover:translate-x-full ease">Get Started</span>
              <span className="relative invisible">Get Started</span>
            </button>
          </Link>
        </div>

        <div className='mt-20'>
          <RepoData />
        </div>

        {/* Integration Section */}
        <div className="p-8 mt-16 bg-white border-2 border-primary rounded-xl text-primary">
          <h2 className="mb-6 font-serif text-3xl font-bold text-center text-bg">
            Integrations
          </h2>
          <ul className="space-y-4">
            <li>
              <a href="https://firebase.google.com/" className="text-lg font-medium transition-colors duration-300 text-primaryVariant hover:text-bg hover:underline">
                Editor
              </a>
            </li>
            <li>
              <a href="https://nextjs.org/" className="text-lg font-medium transition-colors duration-300 text-primaryVariant hover:text-bg hover:underline">
                Next.js Integration
              </a>
            </li>
            <li>
              <a href="https://nodejs.org/en/" className="text-lg font-medium transition-colors duration-300 text-primaryVariant hover:text-bg hover:underline">
                Node.js Integration
              </a>
            </li>
            <li>
              <a href="https://aws.amazon.com/" className="text-lg font-medium transition-colors duration-300 text-primaryVariant hover:text-bg hover:underline">
                Gemini summary
              </a>
            </li>
            <li>
              <a href="https://aws.amazon.com/" className="text-lg font-medium transition-colors duration-300 text-primaryVariant hover:text-bg hover:underline">
                Youtube side by side notes taking with screen shot creator just like askify
              </a>
            </li>
            <li>
              <a href="https://stripe.com/" className="text-lg font-medium transition-colors duration-300 text-primaryVariant hover:text-bg hover:underline">
                Stripe Integration
              </a>
            </li>
          </ul>
        </div>

      </div>
      <Footer />
    </div>
  );
}

export default LandingPage;
