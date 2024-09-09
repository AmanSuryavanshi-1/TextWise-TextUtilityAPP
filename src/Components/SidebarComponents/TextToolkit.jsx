import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUpload, FaDownload, FaTrash, FaExchangeAlt, FaCopy, FaAlignLeft, FaQuestionCircle } from 'react-icons/fa';

const TextToolkit = () => {
  const [text, setText] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleUpClick = () => {
    setText(text.toUpperCase());
    showAlert("Converted to uppercase!", "success");
  };

  const handleLowClick = () => {
    setText(text.toLowerCase());
    showAlert("Converted to lowercase", "success");
  };

  const handleClearClick = () => {
    setText('');
    showAlert("Text Cleared!", "success");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    showAlert("Copied to Clipboard!", "success");
  };

  const replaceString = () => {
    let rep = prompt("Enter the word to be replaced:");
    let tobereplaced = new RegExp(rep, 'g');
    let toreplace = prompt("Enter the text that you want to replace with:");
    setText(text.replace(tobereplaced, toreplace));
    showAlert("Word Replaced!", "success");
  };

  const handleOnChange = (event) => {
    setText(event.target.value);
  };

  const toSentenceCase = () => {
    let newText = text.replace(/.+?[\.\?\!](\s|$)/g, (sentence) => {
      return sentence.charAt(0).toUpperCase() + sentence.substr(1).toLowerCase();
    });
    setText(newText);
    showAlert("Converted to Sentence Case!", "success");
  };

  const showAlert = (message, type) => {
    console.log(`${type}: ${message}`);
  };

  const wordCount = text.split(/\s+/).filter((element) => element.length !== 0).length;
  const charCount = text.length;
  const readingTime = (0.008 * wordCount).toFixed(2);

  return (
    <div className="p-4 overflow-hidden font-sans  bg-primaryVariant dark:bg-bg dark:text-primary max-md:overflow-auto">
      <div className="relative flex flex-col items-start justify-between gap-2 mb-1 md:gap-2 md:flex-row md:items-center">
        <div className="flex items-center">
          <h1 className="font-serif text-4xl font-bold sm:text-3xl text-bg dark:text-primary">Text Toolkit</h1>
          <div 
            className="relative ml-2"
            onMouseEnter={() => setShowPopup(true)}
            onMouseLeave={() => setShowPopup(false)}
          >
            <FaQuestionCircle className="text-xl cursor-pointer text-bgVariant dark:textColor" />
            {showPopup && (
              <div className="absolute left-0 z-10 p-4 text-sm text-left bg-white rounded-lg shadow-lg w-72 text-bg dark:bg-bg-variant dark:text-primary hover:cursor-default">
                <p><strong>Text Toolkit</strong> is a versatile text manipulation tool.</p>
                <ul className="list-disc list-inside">
                  <li>Convert text to uppercase/lowercase.</li>
                  <li>Clear text content.</li>
                  <li>Replace words within the text.</li>
                  <li>Copy text to your clipboard.</li>
                  <li>Transform text into sentence case.</li>
                  <li>Learn more on the <Link to="/" className="text-primary hover:underline"> landing page</Link>.</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6 mt-3 lg:flex-row">
        <div className="flex flex-col w-full lg:w-1/2">
          <div className="flex flex-wrap gap-2 mb-3">
            {[
              { icon: FaUpload, text: "Uppercase", onClick: handleUpClick },
              { icon: FaDownload, text: "Lowercase", onClick: handleLowClick },
              { icon: FaTrash, text: "Clear", onClick: handleClearClick },
              { icon: FaExchangeAlt, text: "Replace", onClick: replaceString },
              { icon: FaCopy, text: "Copy", onClick: handleCopy },
              { icon: FaAlignLeft, text: "Sentence Case", onClick: toSentenceCase },
            ].map((btn, index) => (
              <button 
                key={index}
                disabled={text.length === 0} 
                className="flex items-center gap-1 px-3 py-1 text-sm font-semibold text-white transition shadow-md rounded-2xl bg-bgVariant duration-400 hover:bg-primary hover:text-text-color disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={btn.onClick}
              >
                <btn.icon className="text-lg" />{btn.text}
              </button>
            ))}
          </div>
          <textarea 
            className="w-full border-2 rounded-sm border-bgVariant p-4 text-base shadow-inner resize-none h-[67vh] border-bg-variant focus:outline-none focus:ring-2 focus:ring-bg-variant bg-primary-variant dark:bg-bg-variant text-text-color dark:text-primary overflow-y-auto scrollbar-thin scrollbar-thumb-bgVariant scrollbar-track-bg"
            value={text} 
            onChange={handleOnChange} 
            id="myBox" 
            placeholder="Enter text..."
          />
          
        </div>
        <div className="flex flex-col w-full lg:w-1/2">
          <div className="flex flex-col bg-primary-variant dark:bg-bg-variant h-[80vh]">
          <h3 className="mb-1 font-serif text-xl font-semibold text-bg dark:text-primary">Your Text Summary</h3>
            <div className="flex items-center justify-between mb-4 text-sm">
              <span className="px-4 py-1 rounded-xl bg-bg text-primary">Reading Time: {readingTime} min</span>
              <span className="px-4 py-1 rounded-xl bg-bg text-primary">Words: {wordCount}</span>
              <span className="px-4 py-1 rounded-xl bg-bg text-primary">Characters: {charCount}</span>
            </div>
            <div className="flex-grow p-4 overflow-y-auto bg-white border-2 rounded-sm shadow-inner border-bgVariant dark:bg-bg text-textColor dark:text-primary scrollbar-thin scrollbar-thumb-bg scrollbar-track-primary">
              <p className="break-words whitespace-pre-wrap">
                {text.length > 0 ? text : "Nothing to preview!"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextToolkit;
