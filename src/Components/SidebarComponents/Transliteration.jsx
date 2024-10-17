import React, { useState, useRef, useEffect } from 'react';
import { FaCopy, FaTrash, FaQuestionCircle } from 'react-icons/fa';
import { HiTranslate } from 'react-icons/hi';

const Transliteration = () => {
  const [inputText, setInputText] = useState('');
  const [transliteratedText, setTransliteratedText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('en-t-i0-und');
  const [copied, setCopied] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const textAreaRef = useRef(null);

  const languages = {
    'en-t-i0-und': 'English',
    'hi-t-i0-und': 'Hindi',
    'sa-t-i0-und': 'Sanskrit',
    'bn-t-i0-und': 'Bengali',
    'ta-t-i0-und': 'Tamil',
    'te-t-i0-und': 'Telugu',
    'ml-t-i0-und': 'Malayalam',
    'kn-t-i0-und': 'Kannada',
    'gu-t-i0-und': 'Gujarati',
    'mr-t-i0-und': 'Marathi',
    'pa-t-i0-und': 'Punjabi',
    'ur-t-i0-und': 'Urdu',
    'es-t-i0-und': 'Spanish',
    'fr-t-i0-und': 'French',
    'de-t-i0-und': 'German',
    'ja-t-i0-und': 'Japanese',
    'zh-t-i0-und': 'Chinese',
  };

  useEffect(() => {
    setWordCount(inputText.trim().split(/\s+/).filter(Boolean).length);
  }, [inputText]);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const handleTransliterate = async () => {
    setIsLoading(true);
    setErrorMessage('');

    if (!inputText.trim()) {
      setErrorMessage('Please enter some text to transliterate.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `https://inputtools.google.com/request?text=${encodeURIComponent(inputText)}&itc=${sourceLanguage}&num=1&cp=0&cs=1&ie=utf-8&oe=utf-8`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Transliteration failed, please try again later.');
      }

      const data = await response.json();

      if (data[0] === 'SUCCESS') {
        const transliteratedParts = data[1].map(part => part[1][0]);
        setTransliteratedText(transliteratedParts.join(''));
      } else {
        throw new Error('Invalid input for transliteration.');
      }
    } catch (error) {
      console.error('Error during transliteration:', error);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const resetText = () => {
    setInputText('');
    setTransliteratedText('');
    setErrorMessage('');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(transliteratedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="p-4 h-[94vh] overflow-y-auto font-sans bg-primaryVariant dark:bg-bg dark:text-primary">
      <div className="relative flex flex-col items-start justify-between gap-2 md:gap-2 md:flex-row md:items-center">
        <div className="flex items-center">
          <h1 className="flex font-serif text-4xl font-bold sm:text-3xl text-bg dark:text-primary">
            <HiTranslate className="mt-1 mr-2 text-2xl" />
            Transliteration
          </h1>
          <div
            className="relative ml-2"
            onMouseEnter={() => setShowPopup(true)}
            onMouseLeave={() => setShowPopup(false)}
          >
            <FaQuestionCircle className="text-2xl cursor-pointer text-bgVariant" />
            {showPopup && (
              <div className="absolute left-0 z-10 p-4 font-serif text-left border-2 rounded-lg shadow-2xl max-md:w-60 max-md:top-8 max-md:-left-48 bg-primary border-bg text-md w-96 text-bg dark:bg-bg-variant dark:text-primary hover:cursor-default">
                <p>
                  <strong>Transliteration Tool</strong> converts text from one script to another:
                </p>
                <ul className="list-disc list-inside">
                  <li>Supports multiple languages</li>
                  <li>Real-time transliteration</li>
                  <li>Copy transliterated text</li>
                  <li>Word count display</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex flex-col gap-5 mx-5 md:flex-row">
          <div className="w-full md:w-1/2">
            <div className="flex justify-between my-3">
              <select
                className="px-2 py-1 text-sm font-semibold border-[2.5px] border-bg rounded-lg scrollbar-thin scrollbar-thumb-primaryVariant bg-primary text-bg max-w-[200px]"
                value={sourceLanguage}
                onChange={(e) => setSourceLanguage(e.target.value)}
              >
                {Object.entries(languages).map(([code, name]) => (
                  <option key={code} value={code}>{name}</option>
                ))}
              </select>
            </div>
            <textarea
              ref={textAreaRef}
              className="w-full h-[63vh] p-4 bg-white border-2 rounded-md scrollbar-thin scrollbar-thumb-bgVariant scrollbar-track-primary border-bg resize-none"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type here to transliterate..."
            />
          </div>

          <div className="w-full md:w-1/2">
            <div className="flex justify-between my-3">
              <span className="px-3 py-1 text-sm font-semibold border-[2.5px] border-bg rounded-lg scrollbar-thin scrollbar-thumb-primaryVariant bg-primary text-bg">
                Transliterated Text
              </span>
            </div>
            <textarea
              className="w-full h-[63vh] p-4 bg-white border-2 rounded-md scrollbar-thin scrollbar-thumb-bgVariant scrollbar-track-primary border-bg resize-none"
              value={transliteratedText}
              readOnly
              placeholder="Transliterated text will appear here..."
            />
          </div>
        </div>

        {errorMessage && (
          <div className="p-3 my-4 text-sm font-bold text-white bg-red-500 rounded-md animate-fade-out">
            {errorMessage}
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-4 mx-5 mt-1 text-sm">
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 px-4 py-2 text-sm font-serif font-semibold transition border-[2.5px] shadow-md border-bg rounded-xl bg-primaryVariant text-bg">
              Word count: {wordCount}
            </div>

            <button
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold transition border-[2.5px] text-white shadow-md border-bg rounded-xl duration-400 bg-bg hover:bg-primaryVariant hover:text-bg"
              onClick={handleTransliterate}
              disabled={isLoading}
            >
              <HiTranslate className="text-lg" />
              {isLoading ? 'Transliterating...' : 'Transliterate'}
            </button>

            <button
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold transition border-[2.5px] text-white shadow-md border-bg rounded-xl duration-400 bg-bg hover:bg-primaryVariant hover:text-bg"
              onClick={resetText}
            >
              <FaTrash className="text-lg" />
              Clear
            </button>
          </div>

          <button
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold transition border-[2.5px] shadow-md border-bg rounded-xl duration-400 ${
              copied ? 'bg-primaryVariant text-bg' : 'bg-bg text-white hover:bg-primaryVariant hover:text-bg'
            }`}
            onClick={copyToClipboard}
          >
            <FaCopy className="text-lg" />
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Transliteration;
