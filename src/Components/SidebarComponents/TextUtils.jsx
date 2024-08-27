import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUpload, FaDownload, FaTrash, FaExchangeAlt, FaCopy, FaAlignLeft } from 'react-icons/fa';

const TextUtils = () => {
  const [text, setText] = useState('');

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
    <div className="w-[85vw] mx-auto font-sans bg-white dark:bg-bg text-text-color dark:text-primary p-6 rounded-lg shadow-custom">
      <h1 className="mb-4 font-serif text-4xl font-bold text-bg dark:text-primary">TextUtils</h1>
      <h5 className="mb-4 text-xl text-bg-variant dark:text-primary-variant">Your Text Enhancement Solution</h5>
      <p className="mb-8 text-gray-600 dark:text-light">
        TextUtils is a text utility app designed to enhance your text with ease. It offers a variety of features to help you manipulate your text efficiently.
        Learn more about its functionalities on the <Link to="/" className="text-bg-variant hover:underline">about page</Link>.
      </p>
      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="flex flex-col w-full lg:w-1/2">
          <div className="flex flex-wrap gap-2 mb-4">
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
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white transition rounded-full shadow-md bg-bg-variant duration-400 hover:bg-primary hover:text-text-color disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={btn.onClick}
              >
                <btn.icon className="text-lg" />{btn.text}
              </button>
            ))}
          </div>
          <textarea 
            className="flex-grow h-[40vh] w-full p-4 overflow-y-auto text-base border rounded-lg shadow-inner resize-none scrollbar-thin scrollbar-thumb-bg-variant scrollbar-track-primary border-bg-variant focus:outline-none focus:ring-2 focus:ring-bg-variant bg-primary-variant dark:bg-bg-variant text-text-color dark:text-primary"
            value={text} 
            onChange={handleOnChange} 
            id="myBox" 
            placeholder="Enter text..."
            // style={{ height: 'calc(50vh - 2rem)' }} // Adjust this height as needed
          ></textarea>
        </div>
        <div className="flex flex-col w-full lg:w-1/2">
          <div className="flex flex-col flex-grow p-4 border rounded-lg shadow-lg border-bg-variant bg-primary-variant dark:bg-bg-variant">
            <h3 className="mb-2 text-xl font-semibold text-bg dark:text-primary">Your Text Summary</h3>
            <div className="flex items-center justify-between mb-4 text-sm">
              <span className="px-4 py-2 rounded-full bg-bg text-primary">Reading Time: {readingTime} min</span>
              <span className="px-4 py-2 rounded-full bg-bg text-primary">Words: {wordCount}</span>
              <span className="px-4 py-2 rounded-full bg-bg text-primary">Characters: {charCount}</span>
            </div>
            <div className="flex-grow p-4 overflow-y-auto bg-white rounded-lg shadow-inner dark:bg-bg text-text-color dark:text-primary scrollbar-thin scrollbar-thumb-bg-variant scrollbar-track-primary"
                 style={{ height: 'calc(45vh - 10rem)' }} // Adjust this height as needed
            >
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

export default TextUtils;
