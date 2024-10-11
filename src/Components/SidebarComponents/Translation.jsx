import React, { useState, useRef, useEffect } from 'react';
import { BsTranslate } from 'react-icons/bs';
import { FaExchangeAlt, FaTrash, FaCopy, FaQuestionCircle } from 'react-icons/fa';
import { HiTranslate } from 'react-icons/hi';

const Translation = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('en');
  const [targetLanguage, setTargetLanguage] = useState('es');
  const [copied, setCopied] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const textAreaRef = useRef(null);

  const nationalLanguages = {
    hi: 'Hindi',
    bn: 'Bengali',
    te: 'Telugu',
    ta: 'Tamil',
    mr: 'Marathi',
    ur: 'Urdu',
    gu: 'Gujarati',
    kn: 'Kannada',
    ml: 'Malayalam',
    pa: 'Punjabi',
    sa: 'Sanskrit',
  };

  const internationalLanguages = {
    en: 'English',
    es: 'Spanish',
    fr: 'French',
    de: 'German',
    it: 'Italian',
    pt: 'Portuguese',
    ru: 'Russian',
    zh: 'Chinese',
    ja: 'Japanese',
    ko: 'Korean',
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

  const handleTranslate = async () => {
    setIsLoading(true);
    setErrorMessage('');
    setTranslatedText('');

    if (!inputText.trim()) {
      setErrorMessage('Please enter some text to translate.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(inputText)}&langpair=${sourceLanguage}|${targetLanguage}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.responseStatus === 200) {
        setTranslatedText(data.responseData.translatedText);
      } else {
        throw new Error(data.responseDetails || 'Unknown translation error');
      }
    } catch (error) {
      console.error('Error during translation:', error);
      setErrorMessage(`Translation failed: ${error.message}. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  const resetText = () => {
    setInputText('');
    setTranslatedText('');
    setErrorMessage('');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(translatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const swapLanguages = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
    setInputText(translatedText);
    setTranslatedText('');
  };

  const renderLanguageOptions = (languages, label) => (
    <optgroup label={label}>
      {Object.entries(languages).map(([code, name]) => (
        <option key={code} value={code}>{name}</option>
      ))}
    </optgroup>
  );

  return (
    <div className="p-4 h-[94vh] overflow-y-auto font-sans bg-primaryVariant dark:bg-bg dark:text-primary">
      <div className="relative flex flex-col items-start justify-between gap-2 md:gap-2 md:flex-row md:items-center">
        <div className="flex items-center">
          <h1 className="flex font-serif text-4xl font-bold sm:text-3xl text-bg dark:text-primary">
            <BsTranslate className="mr-2 text-2xl" />
            Translation
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
                  <strong>Translation Tool</strong> converts text between languages:
                </p>
                <ul className="list-disc list-inside">
                  <li>Supports national and international languages</li>
                  <li>Real-time translation using MyMemory API</li>
                  <li>Copy translated text</li>
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
                {renderLanguageOptions(internationalLanguages, 'International')}
                {renderLanguageOptions(nationalLanguages, 'National')}
              </select>
            </div>
            <textarea
              ref={textAreaRef}
              className="w-full h-[65vh] p-4 bg-white border-2 rounded-md scrollbar-thin scrollbar-thumb-bgVariant scrollbar-track-primary border-bg resize-none"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type here to translate..."
            />
          </div>
          
          <div className="w-full md:w-1/2">
            <div className="flex justify-between my-3">
            <select
                className="px-2 py-1 text-sm font-semibold border-[2.5px] border-bg rounded-lg scrollbar-thin scrollbar-thumb-primaryVariant bg-primary text-bg max-w-[500px]"
                value={targetLanguage}
                onChange={(e) => setTargetLanguage(e.target.value)}
              >
                {renderLanguageOptions(internationalLanguages, 'International')}
                {renderLanguageOptions(nationalLanguages, 'National')}
              </select>
            </div>
            <textarea
               className="w-full h-[65vh] p-4 bg-white border-2 rounded-md scrollbar-thin scrollbar-thumb-bgVariant scrollbar-track-primary border-bg resize-none"
              value={translatedText}
              readOnly
              placeholder="Translated text will appear here..."
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 mx-5 text-sm">
          <div className="flex flex-wrap gap-3">
            <button
              className="flex items-center gap-2 px-4 py-1 text-sm font-semibold  transition w-32 border-[2.5px] text-white shadow-md border-bg rounded-xl  duration-400 bg-bg hover:bg-primaryVariant hover:text-bg"
              onClick={handleTranslate}
              disabled={isLoading}
            >
              <span><HiTranslate className="text-lg"/></span>
              {isLoading ? 'Translating..' : 'Translate'}
            </button>

            <button
              className="flex items-center gap-2 px-4 py-1 text-sm font-semibold  transition border-[2.5px] text-white shadow-md border-bg rounded-xl  duration-400 bg-bg hover:bg-primaryVariant hover:text-bg"
              onClick={resetText}
            >
              <FaTrash className="text-lg" /> Reset
            </button>
          </div>

          <div className="flex gap-3">
            <button
              className="flex items-center gap-2 px-4 py-1 text-sm font-semibold  transition border-[2.5px] text-white shadow-md border-bg rounded-xl  duration-400 bg-bg hover:bg-primaryVariant hover:text-bg"
              onClick={copyToClipboard}
              disabled={!translatedText}
            >
              <FaCopy className="text-lg" /> {copied ? 'Copied!' : 'Copy'}
            </button>

            <button
              className="flex items-center gap-2 px-4 py-1 text-sm font-semibold  transition border-[2.5px] text-white shadow-md border-bg rounded-xl  duration-400 bg-bg hover:bg-primaryVariant hover:text-bg"
              onClick={swapLanguages}
            >
              <FaExchangeAlt /> Swap
            </button>
          </div>
        </div>

          {errorMessage && (
            <div className="absolute top-[7%] left-[30%] mx-auto px-2 py-1 text-sm font-bold text-white bg-red-500 rounded-lg animate-fade-out">
              {errorMessage}
            </div>
          )}
          
      </div>
    </div>
  );
};

export default Translation;