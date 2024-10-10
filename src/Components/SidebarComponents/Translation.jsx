import React, { useState, useRef, useEffect } from 'react';
import { FaExchangeAlt, FaTrash, FaCopy, FaQuestionCircle } from 'react-icons/fa';

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
    <div className="p-3 h-[94vh] overflow-y-auto font-sans bg-primaryVariant dark:bg-bg dark:text-primary">
      <div className="relative flex flex-col items-start justify-between gap-2 mb-2 md:gap-2 md:flex-row md:items-center">
        <div className="flex items-center">
          <h1 className="font-serif text-3xl font-bold sm:text-2xl text-bg dark:text-primary">
            Translation
          </h1>
          <div
            className="relative ml-2"
            onMouseEnter={() => setShowPopup(true)}
            onMouseLeave={() => setShowPopup(false)}
          >
            <FaQuestionCircle className="text-xl cursor-pointer text-bgVariant dark:textColor" />
            {showPopup && (
              <div className="absolute left-0 z-10 p-4 text-sm text-left bg-white rounded-lg shadow-lg w-72 text-bg dark:bg-bg-variant dark:text-primary hover:cursor-default">
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

      <div className="flex flex-col gap-2">
        <div className="flex flex-col w-full gap-4 md:flex-row">
          <div className="w-full md:w-1/2">
            <div className="flex justify-between mb-2">
              <select
                className="px-3 py-1 text-sm font-semibold rounded-md bg-bg text-primary max-w-[200px]"
                value={sourceLanguage}
                onChange={(e) => setSourceLanguage(e.target.value)}
              >
                {renderLanguageOptions(internationalLanguages, 'International')}
                {renderLanguageOptions(nationalLanguages, 'National')}
              </select>
            </div>
            <textarea
              ref={textAreaRef}
              className="w-full h-[70vh] p-4 bg-white border-2 rounded-md scrollbar-thin scrollbar-thumb-bgVariant scrollbar-track-primary border-bg resize-none"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type here to translate..."
            />
          </div>
          
          <div className="w-full md:w-1/2">
            <div className="flex justify-between mb-2">
              <select
                className="px-3 py-1 text-sm font-semibold rounded-md bg-bg text-primary max-w-[200px]"
                value={targetLanguage}
                onChange={(e) => setTargetLanguage(e.target.value)}
              >
                {renderLanguageOptions(internationalLanguages, 'International')}
                {renderLanguageOptions(nationalLanguages, 'National')}
              </select>
            </div>
            <textarea
              className="w-full h-[70vh] p-4 bg-white border-2 rounded-md scrollbar-thin scrollbar-thumb-bgVariant scrollbar-track-primary border-bg resize-none"
              value={translatedText}
              readOnly
              placeholder="Translated text will appear here..."
            />
          </div>
        </div>

        {errorMessage && (
          <div className="p-3 mb-4 text-sm font-bold text-white bg-red-500 rounded-md animate-fade-out">
            {errorMessage}
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
          <div className="flex flex-wrap gap-3">
            <button
              className="flex items-center gap-2 px-4 py-1 text-sm font-semibold text-white transition shadow-md rounded-xl bg-bgVariant duration-400 hover:bg-primary hover:text-text-color"
              onClick={handleTranslate}
              disabled={isLoading}
            >
              {isLoading ? 'Translating...' : 'Translate'}
            </button>

            <button
              className="flex items-center gap-2 px-4 py-1 text-sm font-semibold text-white transition shadow-md rounded-xl bg-bgVariant duration-400 hover:bg-primary hover:text-text-color"
              onClick={resetText}
            >
              <FaTrash className="text-lg" /> Reset
            </button>
          </div>

          <div className="flex gap-3">
            <button
              className="flex items-center gap-2 px-4 py-1 text-sm font-semibold text-white transition shadow-md rounded-xl bg-bgVariant duration-400 hover:bg-primary hover:text-text-color"
              onClick={copyToClipboard}
              disabled={!translatedText}
            >
              <FaCopy className="text-lg" /> {copied ? 'Copied!' : 'Copy'}
            </button>

            <button
              className="flex items-center gap-2 px-4 py-1 text-sm font-semibold text-white transition shadow-md rounded-xl bg-bgVariant duration-400 hover:bg-primary hover:text-text-color"
              onClick={swapLanguages}
            >
              <FaExchangeAlt /> Swap
            </button>
          </div>
        </div>

        <div className="flex justify-end mt-2">
          <span className="px-4 py-1 text-sm font-semibold rounded-xl bg-bg text-primary">
            Word Count: {wordCount}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Translation;