import React, { useState, useRef, useEffect } from 'react';
import { FaCopy, FaTrash, FaSyncAlt, FaQuestionCircle } from 'react-icons/fa';

const Transliteration = () => {
  const [inputText, setInputText] = useState('');
  const [transliteratedText, setTransliteratedText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('en');
  const [copied, setCopied] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const textAreaRef = useRef(null);

  const languageCodes = {
    en: 'en-t-i0-und',
    hi: 'hi-t-i0-und',
    es: 'es-t-i0-und',
    fr: 'fr-t-i0-und',
    de: 'de-t-i0-und',
    ja: 'ja-t-i0-und',
    zh: 'zh-t-i0-und',
    hinglish: 'hi-t-i0-und'
  };

  useEffect(() => {
    setWordCount(inputText.trim().split(/\s+/).filter(Boolean).length);
  }, [inputText]);

  const handleTransliterate = async () => {
    setIsLoading(true);
    setErrorMessage('');
    setTransliteratedText('');

    if (!inputText.trim()) {
      setErrorMessage('Please enter some text to transliterate.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `https://inputtools.google.com/request?text=${encodeURIComponent(inputText)}&itc=${languageCodes[sourceLanguage]}&num=1&cp=0&cs=1&ie=utf-8&oe=utf-8`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data[0] === 'SUCCESS') {
        const transliteratedParts = data[1].map(part => part[1][0]);
        setTransliteratedText(transliteratedParts.join(''));
      } else if (data[0] === 'INVALID_INPUT_METHOD_NAME') {
        throw new Error('Invalid input method. Please check the language selection.');
      } else {
        throw new Error(`API Error: ${data[0]}`);
      }
    } catch (error) {
      console.error('Error during transliteration:', error);
      setErrorMessage(`Transliteration failed: ${error.message}. Please try again.`);
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
    <div className="p-3 h-[94vh] overflow-y-auto font-sans bg-primaryVariant dark:bg-bg dark:text-primary max-md:overflow-auto">
      <div className="relative flex flex-col items-start justify-between gap-2 mb-1 md:gap-2 md:flex-row md:items-center">
        <div className="flex items-center">
          <h1 className="font-serif text-3xl font-bold sm:text-2xl text-bg dark:text-primary">
            Transliteration
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

      <div className="flex flex-col gap-6 mt-1">
        <div className="flex flex-col w-full">
          <textarea
            ref={textAreaRef}
            className="h-[20vh] p-4 bg-white border-2 rounded-md scrollbar-thin scrollbar-thumb-bgVariant scrollbar-track-primary border-bg"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type here to transliterate..."
          />

          <textarea
            className="h-[20vh] p-4 mt-3 bg-white border-2 rounded-md scrollbar-thin scrollbar-thumb-bgVariant scrollbar-track-primary border-bg"
            value={transliteratedText}
            readOnly
            placeholder="Transliterated text will appear here..."
          />

          {errorMessage && (
            <div className="mt-2 text-red-500">{errorMessage}</div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-4 mt-3 text-sm">
            <div className="flex flex-wrap gap-2">
              <button
                className="flex items-center gap-2 px-4 py-1 text-sm font-semibold text-white transition shadow-md rounded-xl bg-bgVariant duration-400 hover:bg-primary hover:text-text-color"
                onClick={handleTransliterate}
                disabled={isLoading}
              >
                {isLoading ? (
                  'Transliterating...'
                ) : (
                  <>
                    <FaSyncAlt className="text-lg" /> Transliterate
                  </>
                )}
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
                disabled={!transliteratedText}
              >
                <FaCopy className="text-lg" /> {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <select
                className="px-3 py-1 text-sm font-semibold rounded-md bg-bg text-primary"
                value={sourceLanguage}
                onChange={(e) => setSourceLanguage(e.target.value)}
              >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="ja">Japanese</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>

              <span className="px-4 py-1 rounded-md bg-bg text-primary">
                Word Count: {wordCount}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transliteration;