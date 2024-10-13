import React, { useState, useRef, useEffect } from 'react';
import { BsTranslate } from 'react-icons/bs';
import { FaExchangeAlt, FaTrash, FaCopy, FaQuestionCircle } from 'react-icons/fa';
import { HiTranslate } from 'react-icons/hi';

const MAX_TEXT_LENGTH = 500; // Define a reasonable limit based on API constraints

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

  const languages = {
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
    ar: 'Arabic',
    hi: 'Hindi',
    bn: 'Bengali',
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

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const translateApis = [
    {
      name: 'LibreTranslate',
      url: 'https://libretranslate.de/translate',
      method: 'POST',
      body: (text, source, target) => JSON.stringify({ q: text, source, target }),
      headers: { 'Content-Type': 'application/json' },
      extract: (data) => data.translatedText,
    },
    {
      name: 'MyMemory',
      url: (text, source, target) => `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${source}|${target}`,
      method: 'GET',
      extract: (data) => data.responseData.translatedText,
    },
  ];

  const translateWithFallback = async (text, source, target, retries = 2) => {
    for (const api of translateApis) {
      for (let i = 0; i < retries; i++) {
        try {
          const url = typeof api.url === 'function' ? api.url(text, source, target) : api.url;
          const response = await fetch(url, {
            method: api.method,
            body: api.body ? api.body(text, source, target) : undefined,
            headers: api.headers,
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          return api.extract(data);
        } catch (error) {
          console.error(`Attempt ${i + 1} with ${api.name} failed:`, error);
          if (i === retries - 1 && api === translateApis[translateApis.length - 1]) {
            throw error;
          }
          await delay(1000 * (i + 1)); // Exponential backoff
        }
      }
    }
  };

  const chunkText = (text, maxLength) => {
    const words = text.split(' ');
    const chunks = [];
    let chunk = '';

    for (const word of words) {
      if ((chunk + word).length > maxLength) {
        chunks.push(chunk.trim());
        chunk = '';
      }
      chunk += `${word} `;
    }

    if (chunk.trim()) {
      chunks.push(chunk.trim());
    }

    return chunks;
  };

  const handleTranslate = async () => {
    setIsLoading(true);
    setErrorMessage('');
    setTranslatedText('');

    if (!inputText.trim()) {
      setErrorMessage('Please enter some text to translate.');
      setIsLoading(false);
      return;
    }

    const textChunks = chunkText(inputText, MAX_TEXT_LENGTH); // Split text into smaller chunks
    const translatedChunks = [];

    try {
      for (const chunk of textChunks) {
        const translatedChunk = await translateWithFallback(chunk, sourceLanguage, targetLanguage);
        translatedChunks.push(translatedChunk);
      }

      setTranslatedText(translatedChunks.join(' ')); // Combine translated chunks
    } catch (error) {
      console.error('Translation failed:', error);
      setErrorMessage(`Translation failed: ${error.message}. Please try again later.`);
    } finally {
      setIsLoading(false);
    }
  };

  const resetText = () => {
    setInputText('');
    setTranslatedText('');
    setErrorMessage('');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(translatedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (error) {
      setErrorMessage('Failed to copy to clipboard.');
    }
  };

  const swapLanguages = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
    setInputText(translatedText);
    setTranslatedText('');
  };

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
                  <li>Supports multiple languages</li>
                  <li>Uses LibreTranslate API</li>
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
                {Object.entries(languages).map(([code, name]) => (
                  <option key={code} value={code}>{name}</option>
                ))}
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
                className="px-2 py-1 text-sm font-semibold border-[2.5px] border-bg rounded-lg scrollbar-thin scrollbar-thumb-primaryVariant bg-primary text-bg max-w-[200px]"
                value={targetLanguage}
                onChange={(e) => setTargetLanguage(e.target.value)}
              >
                {Object.entries(languages).map(([code, name]) => (
                  <option key={code} value={code}>{name}</option>
                ))}
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

        <div className="flex flex-wrap items-center justify-between gap-4 mx-5 mt-4 text-sm">
          <div className="flex flex-wrap gap-3">
            <button
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold transition border-[2.5px] text-white shadow-md border-bg rounded-xl duration-400 bg-bg hover:bg-primaryVariant hover:text-bg"
              onClick={handleTranslate}
              disabled={isLoading}
            >
              <HiTranslate className="text-lg" />
              {isLoading ? 'Translating...' : 'Translate'}
            </button>

            <button
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold transition border-[2.5px] text-white shadow-md border-bg rounded-xl duration-400 bg-bg hover:bg-primaryVariant hover:text-bg"
              onClick={resetText}
            >
              <FaTrash className="text-lg" /> Reset
            </button>
          </div>

          <div className="flex gap-3">
            <button
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold transition border-[2.5px] text-white shadow-md border-bg rounded-xl duration-400 bg-bg hover:bg-primaryVariant hover:text-bg"
              onClick={copyToClipboard}
              disabled={!translatedText}
            >
              <FaCopy className="text-lg" /> {copied ? 'Copied!' : 'Copy'}
            </button>

            <button
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold transition border-[2.5px] text-white shadow-md border-bg rounded-xl duration-400 bg-bg hover:bg-primaryVariant hover:text-bg"
              onClick={swapLanguages}
            >
              <FaExchangeAlt /> Swap
            </button>
          </div>
        </div>

        {errorMessage && (
          <div className="px-4 py-2 mt-4 text-sm font-bold text-white bg-red-500 rounded-lg">
            {errorMessage}
          </div>
        )}
        
        <div className="mt-4 text-sm text-gray-500">
          Word count: {wordCount}
        </div>
      </div>
    </div>
  );
};

export default Translation;
