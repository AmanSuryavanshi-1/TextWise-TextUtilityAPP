import React from 'react';
import { Link } from "react-router-dom";
import { FaEdit, FaFileAlt, FaCamera, FaHeadphones, FaGlobe, FaYoutube, FaTools, FaArrowRight, FaUser, FaRocket } from 'react-icons/fa';
import Footer from '../Components/Footer';
import RepoData from '../Components/About/RepoData';

const LandingPage = () => {

  const cards = [
      { 
        imgSrc: '/assets/Editor.jpg', 
        alt: "Playground", 
        title: "Playground", 
        description: "Experience a versatile text editor combined with a collaborative whiteboard. Create, edit, and brainstorm ideas in real-time with your team. Whether you are drafting documents, collaborating on a project, or sketching ideas, the Playground is your all-in-one solution for seamless teamwork.", 
        icon: <FaEdit className="text-3xl text-white" />,
        link: "/layout/editor"
      },
      { 
        imgSrc: "/assets/NoteTaking.jpg", 
        alt: "User Notes", 
        title: "User Notes", 
        description: "Effortlessly create, organize, and format your notes using our user-friendly text editor. Streamline your thoughts into structured documents, making them easy to retrieve and manage. From quick to-dos to detailed documents, our notes tool helps keep everything in perfect order and accessible anytime.", 
        icon: <FaFileAlt className="text-3xl text-white" />,
        link: "/layout/notes"
      },
      { 
        imgSrc: "/assets/Summarizer.jpg", 
        alt: "Summarization", 
        title: "Summarization", 
        description: "Quickly extract key insights from long texts with our advanced summarization tool. Save time by condensing large volumes of information into short, digestible summaries. Ideal for professionals and students alike, this tool transforms detailed content into a concise format without losing the essence of the material.", 
        icon: <FaCamera className="text-3xl text-white" />,
        link: "/layout/summarizer"
      },
      { 
        imgSrc: "/assets/transcribe.jpg", 
        alt: "Transcription", 
        title: "Transcription", 
        description: "Convert spoken words into text and vice versa seamlessly with our transcription tool. Ideal for meetings, lectures, interviews, and podcasts, this tool ensures that you never miss important details. Generate accurate transcripts in seconds, making it easy to review and share spoken content.", 
        icon: <FaHeadphones className="text-3xl text-white" />,
        link: "/layout/stt"
      },
      { 
        imgSrc: '/assets/Transliteration.jpg', 
        alt: "Transliteration", 
        title: "Transliteration", 
        description: "Easily convert text between different languages while preserving the meaning and readability. Perfect for global communication, this tool breaks down language barriers by converting alphabets without altering the original message. Simplify cross-linguistic text conversions with our user-friendly transliteration feature.", 
        icon: <FaGlobe className="text-3xl text-white" />,
        link: "/layout/transliteration"
      },
      { 
        imgSrc: "/assets/Summarizer.jpg", 
        alt: "Youtube Summarizer", 
        title: "Youtube Summarizer", 
        description: "Summarize YouTube videos in seconds. Get the key points and insights from any video without watching the full content. Ideal for students, professionals, or anyone in a hurry, this tool saves time by giving you an instant breakdown of long video content.", 
        icon: <FaYoutube className="text-3xl text-white" />,
        link: "/layout/summarizer"
      },
      { 
        imgSrc: "/assets/TextToolkit.jpeg", 
        alt: "Text Toolkit", 
        title: "Text Toolkit", 
        description: "Enhance your text using our comprehensive toolkit. Whether you need to convert text case, copy, replace, or clear content, our Text Toolkit has everything you need for text manipulation. Perfect for fast editing, our tool is designed to streamline and simplify your text-related tasks.", 
        icon: <FaTools className="text-3xl text-white" />,
        link: "/layout/text-toolkit"
      },
      { 
        imgSrc: "/assets/TextToolkit.jpeg", 
        alt: "Text Toolkit", 
        title: "Text Toolkit", 
        description: "Enhance your text using our comprehensive toolkit. Whether you need to convert text case, copy, replace, or clear content, our Text Toolkit has everything you need for text manipulation. Perfect for fast editing, our tool is designed to streamline and simplify your text-related tasks.", 
        icon: <FaTools className="text-3xl text-white" />,
        link: "/layout/text-toolkit"
      },
    ];
  

  const integrations = [
    "Editor",
    "Next.js Integration",
    "Node.js Integration",
    "Gemini summary",
    "Youtube side by side notes taking with screen shot creator",
    "Stripe Integration"
  ];

  return (
    <div className="min-h-screen bg-primaryVariant">
      <div className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <header className="text-center">
          <h1 className="font-serif text-6xl font-bold tracking-wide text-bg sm:text-7xl lg:text-6xl">
            TextWise
          </h1>
          <p className="mt-6 font-sans text-xl text-textColor">Unlock the power of text with our versatile Toolkit</p>
        </header>

        <div className="grid grid-cols-1 gap-8 mt-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {cards.map((card, index) => (
            <Link 
              key={index} 
              to={card.link}
              className="flex flex-col overflow-hidden transition-all duration-300 rounded-lg shadow-lg hover:shadow-2xl group hover:-translate-y-5"
            >
              <div className="relative h-48 overflow-hidden">
                <img src={card.imgSrc} alt={card.alt} className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110" />
                <div className="absolute inset-0 flex items-center justify-center transition-opacity opacity-0 bg-bgVariant bg-opacity-90 group-hover:opacity-100">
                  {card.icon}
                </div>
              </div>
              <div className="flex flex-col flex-grow p-6 bg-white">
                <h2 className="mb-3 font-serif text-2xl font-semibold text-bg group-hover:text-primary">{card.title}</h2>
                <p className="flex-grow font-sans text-sm text-textColor">{card.description}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex flex-col items-center justify-center mt-20 space-y-10 sm:space-y-12">
          <div className="w-full max-w-md px-12 py-8 text-center bg-white border-2 shadow-lg rounded-3xl border-bg">
            <h3 className="mb-3 font-serif text-2xl font-semibold text-bg">Welcome Back</h3>
            <p className="mb-6 text-base text-textColor">Access your account to continue using TextWise.</p>
            <Link to="/auth" className="inline-flex items-center px-6 py-2 font-semibold text-white transition-all duration-300 border-2 rounded-full bg-bg hover:bg-bgVariant border-bg">
              <FaUser className="mr-2" />
              Access Account
            </Link>
          </div>
        </div>

        <Link to="/layout/text-toolkit" className="block w-1/4 mx-auto mt-10">
                <button className="relative w-full px-8 py-4 overflow-hidden text-lg font-semibold text-white transition-all duration-300 ease-in-out transform border-2 rounded-full shadow-lg group bg-bgVariant hover:shadow-xl border-bg">
                  <span className="absolute inset-0 flex items-center justify-center w-full h-full duration-300 -translate-x-full bg-bg group-hover:translate-x-0 ease">
                    <FaArrowRight className="w-6 h-6 text-white" />
                  </span>
                  <span className="flex items-center justify-center w-full transition-all duration-300 transform group-hover:translate-x-full ease">
                    <FaRocket className="w-6 h-6 mr-2" />
                    Get Started
                  </span>
                  <span className="sr-only">Get Started</span>
                </button>
            </Link>
            
        {/* RepoData Section */}
        <RepoData/>

        {/* Integrations Section */}
        <div className="p-8 mt-16 bg-white border-2 rounded-xl border-bg">
          <h2 className="mb-6 font-serif text-3xl font-bold text-center text-bg">
            Integrations
          </h2>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {integrations.map((item, index) => (
              <li key={index} className="p-4 transition-colors duration-300 border rounded-lg hover:bg-bgVariant hover:text-white border-bg">
                <a href="#" className="text-lg font-medium cursor-pointer text-textColor ">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

            <Link to="/layout/editor" className="block w-1/2 mx-auto mt-10">
                <button className="relative w-full px-8 py-4 overflow-hidden text-lg font-semibold text-white transition-all duration-300 ease-in-out transform border-2 rounded-full shadow-lg group bg-bgVariant hover:shadow-xl border-bg">
                  <span className="absolute inset-0 flex items-center justify-center w-full h-full duration-300 -translate-x-full bg-bg group-hover:translate-x-0 ease">
                    <FaArrowRight className="w-6 h-6 text-white" />
                  </span>
                  <span className="flex items-center justify-center w-full transition-all duration-300 transform group-hover:translate-x-full ease">
                    <FaRocket className="w-6 h-6 mr-2" />
                    Get Started
                  </span>
                  <span className="sr-only">Get Started</span>
                </button>
            </Link>
                
      </div>
      <Footer />
    </div>
  );
}

export default LandingPage;