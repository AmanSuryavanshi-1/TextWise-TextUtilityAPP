import React, { useState, useEffect, useRef } from 'react';
import { FaCopy, FaTrash, FaSyncAlt, FaQuestionCircle } from 'react-icons/fa';
import axios from 'axios';

const Transliteration = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('en');
  const [targetLanguage, setTargetLanguage] = useState('hi'); // Default target language is Hindi
  const [copied, setCopied] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const textAreaRef = useRef(null);

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
      const response = await axios.post('https://libretranslate.com/translate', {
        q: inputText,
        source: sourceLanguage,
        target: targetLanguage,
        format: 'text',
      });

      if (response.status === 200) {
        setTranslatedText(response.data.translatedText);
      } else {
        throw new Error('Translation failed.');
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

  useEffect(() => {
    setWordCount(inputText.trim().split(/\s+/).filter(Boolean).length);
  }, [inputText]);

  return (
    <div className="p-3 h-[94vh] overflow-y-auto font-sans bg-primaryVariant dark:bg-bg dark:text-primary max-md:overflow-auto">
      <div className="relative flex flex-col items-start justify-between gap-2 mb-1 md:gap-2 md:flex-row md:items-center">
        <div className="flex items-center">
          <h1 className="font-serif text-3xl font-bold sm:text-2xl text-bg dark:text-primary">
            Translation Tool
          </h1>
          {/* Tooltip Popup */}
          <div
            className="relative ml-2"
            onMouseEnter={() => setShowPopup(true)}
            onMouseLeave={() => setShowPopup(false)}
          >
            <FaQuestionCircle className="text-xl cursor-pointer text-bgVariant dark:textColor" />
            {showPopup && (
              <div className="absolute left-0 z-10 p-4 text-sm text-left bg-white rounded-lg shadow-lg w-72 text-bg dark:bg-bg-variant dark:text-primary hover:cursor-default">
                <p>
                  <strong>Translation Tool</strong> converts text from one language to another:
                </p>
                <ul className="list-disc list-inside">
                  <li>Supports multiple languages</li>
                  <li>Real-time translation</li>
                  <li>Copy translated text</li>
                  <li>Word count display</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Input and Translation Area */}
      <div className="flex flex-col gap-6 mt-1">
        <textarea
          ref={textAreaRef}
          className="h-[20vh] p-4 bg-white border-2 rounded-md scrollbar-thin scrollbar-thumb-bgVariant scrollbar-track-primary border-bg"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type here to translate..."
        />

        <textarea
          className="h-[20vh] p-4 mt-3 bg-white border-2 rounded-md scrollbar-thin scrollbar-thumb-bgVariant scrollbar-track-primary border-bg"
          value={translatedText}
          readOnly
          placeholder="Translated text will appear here..."
        />

        {errorMessage && (
          <div className="mt-2 text-red-500">{errorMessage}</div>
        )}

        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-3 text-sm">
          <div className="flex flex-wrap gap-2">
            <button
              className="flex items-center gap-2 px-4 py-1 text-sm font-semibold text-white transition shadow-md rounded-xl bg-bgVariant duration-400 hover:bg-primary hover:text-text-color"
              onClick={handleTranslate}
              disabled={isLoading}
            >
              {isLoading ? 'Translating...' : (<><FaSyncAlt className="text-lg" /> Translate</>)}
            </button>

            <button
              className="flex items-center gap-2 px-4 py-1 text-sm font-semibold text-white transition shadow-md rounded-xl bg-bgVariant duration-400 hover:bg-primary hover:text-text-color"
              onClick={resetText}
            >
              <FaTrash className="text-lg" /> Reset
            </button>

            <button
              className="flex items-center gap-2 px-4 py-1 text-sm font-semibold text-white transition shadow-md rounded-xl bg-bgVariant duration-400 hover:bg-primary hover:text-text-color"
              onClick={copyToClipboard}
              disabled={!translatedText}
            >
              <FaCopy className="text-lg" /> {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>

          {/* Language Selection */}
          <div className="flex flex-wrap items-center gap-3">
            <select
              className="px-3 py-1 text-sm font-semibold rounded-md bg-bg text-primary"
              value={sourceLanguage}
              onChange={(e) => setSourceLanguage(e.target.value)}
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="ja">Japanese</option>
              <option value="zh">Chinese</option>
            </select>

            <select
              className="px-3 py-1 text-sm font-semibold rounded-md bg-bg text-primary"
              value={targetLanguage}
              onChange={(e) => setTargetLanguage(e.target.value)}
            >
              <option value="hi">Hindi</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="ja">Japanese</option>
              <option value="zh">Chinese</option>
            </select>

            <span className="px-4 py-1 rounded-md bg-bg text-primary">
              Word Count: {wordCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transliteration;
