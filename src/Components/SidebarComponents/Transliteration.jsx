import React, { useState } from 'react';
import { transliterate } from 'indic-transliterator';

const Transliteration = () => {
  const [inputText, setInputText] = useState('');
  const [transliteratedText, setTransliteratedText] = useState('');
  const [language, setLanguage] = useState('hindi'); // Default to Hindi
  const [errorMessage, setErrorMessage] = useState('');

  const languages = {
    hindi: 'Hindi',
    tamil: 'Tamil',
    bengali: 'Bengali',
    telugu: 'Telugu',
    kannada: 'Kannada',
    malayalam: 'Malayalam',
    gujarati: 'Gujarati',
  };

  const handleTransliterate = () => {
    if (!inputText.trim()) {
      setErrorMessage('Please enter some text to transliterate.');
      return;
    }

    try {
      // Transliterate the text using the selected language
      const transliteration = transliterate(inputText, language);
      setTransliteratedText(transliteration);
      setErrorMessage(''); // Clear any previous error
    } catch (error) {
      console.error('Transliteration failed:', error);
      setErrorMessage('Failed to transliterate text. Please try again.');
    }
  };

  return (
    <div className="transliteration-container">
      <h1>Transliteration Tool</h1>
      <div>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="language-select"
        >
          {Object.entries(languages).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <textarea
        placeholder="Enter text to transliterate..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        rows={4}
        cols={50}
      />

      <button onClick={handleTransliterate}>Transliterate</button>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {transliteratedText && (
        <div>
          <h2>Transliterated Text</h2>
          <p>{transliteratedText}</p>
        </div>
      )}
    </div>
  );
};
export default Transliteration;
