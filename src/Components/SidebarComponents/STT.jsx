import React, { useState, useEffect, useRef } from 'react';
import { FaMicrophone, FaMicrophoneSlash, FaCopy, FaTrash, FaQuestionCircle } from 'react-icons/fa';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Link } from 'react-router-dom';

const STT = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const [language, setLanguage] = useState('en-US');
  const [copied, setCopied] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const chatAreaRef = useRef(null);

  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
    setWordCount(transcript.trim().split(/\s+/).length);
  }, [transcript]);

  const toggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening({ continuous: true, language });
    }
  };

  const handleChangeLanguage = (e) => {
    const newLanguage = e.target.value;
    setLanguage(newLanguage);
    if (listening) {
      SpeechRecognition.stopListening();
      SpeechRecognition.startListening({ continuous: true, language: newLanguage });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(transcript);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className="p-3 h-[94vh] overflow-hidden font-sans bg-primaryVariant dark:bg-bg dark:text-primary max-md:overflow-auto">
      <div className="relative flex flex-col items-start justify-between gap-2 mb-1 md:gap-2 md:flex-row md:items-center">
        <div className="flex items-center">
          <h1 className="font-serif text-3xl font-bold sm:text-2xl text-bg dark:text-primary">Speech to Text</h1>
          <div 
            className="relative ml-2"
            onMouseEnter={() => setShowPopup(true)}
            onMouseLeave={() => setShowPopup(false)}
          >
            <FaQuestionCircle className="text-xl cursor-pointer text-bgVariant dark:textColor" />
            {showPopup && (
              <div className="absolute left-0 z-10 p-4 text-sm text-left bg-white rounded-lg shadow-lg w-72 text-bg dark:bg-bg-variant dark:text-primary hover:cursor-default">
                <p><strong>Enhanced Speech to Text</strong> converts your speech into text with various features:</p>
                <ul className="list-disc list-inside">
                  <li>Support for English and Hindi</li>
                  <li>Real-time transcription</li>
                  <li>Copy text to clipboard</li>
                  <li>Word count</li>
                  <li>Learn more on the <Link to="/" className="text-primary hover:underline">landing page</Link>.</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6 mt-1">
        <div className="flex flex-col w-full">
          <div 
            ref={chatAreaRef}
            className="h-[77vh] overflow-y-auto bg-white border-2 rounded-md scrollbar-thin scrollbar-thumb-bgVariant scrollbar-track-primary border-bg p-4"
          >
            {transcript || "Start speaking to see the transcription here..."}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 mt-3 text-sm">
            <div className="flex flex-wrap gap-2">
              <button 
                className="flex items-center gap-2 px-4 py-1 text-sm font-semibold text-white transition shadow-md rounded-xl bg-bgVariant duration-400 hover:bg-primary hover:text-text-color"
                onClick={toggleListening}
              >
                {listening ? <FaMicrophoneSlash className="text-lg" /> : <FaMicrophone className="text-lg" />}
                {listening ? 'Stop' : 'Start'}
              </button>
              <button 
                className="flex items-center gap-2 px-4 py-1 text-sm font-semibold text-white transition shadow-md rounded-xl bg-bgVariant duration-400 hover:bg-primary hover:text-text-color"
                onClick={resetTranscript}
              >
                <FaTrash className="text-lg" />Reset
              </button>
              <button 
                className="flex items-center gap-2 px-4 py-1 text-sm font-semibold text-white transition shadow-md rounded-xl bg-bgVariant duration-400 hover:bg-primary hover:text-text-color"
                onClick={copyToClipboard}
              >
                <FaCopy className="text-lg" />{copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <select 
                className="px-3 py-1 text-sm font-semibold rounded-md bg-bg text-primary"
                value={language}
                onChange={handleChangeLanguage}
              >
                <option value="en-US">English (US)</option>
                <option value="hi-IN">Hindi</option>
              </select>
              <span className="px-4 py-1 rounded-md bg-bg text-primary">
                Word Count: {wordCount}
              </span>
              <span className="px-4 py-1 rounded-md bg-bg text-primary">
                {listening ? 'Listening...' : 'Not Listening'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default STT;