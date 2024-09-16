import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FaPlay, FaPause, FaStop, FaVolumeUp, FaVolumeDown, FaQuestionCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const TTS = () => {
  const [text, setText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [volume, setVolume] = useState(1);
  const [readingTime, setReadingTime] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const utteranceRef = useRef(null);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices().filter(voice => voice.lang.startsWith('en-'));
      setVoices(availableVoices);
      if (!selectedVoice && availableVoices.length > 0) {
        setSelectedVoice(availableVoices[0]);
      }
    };

    loadVoices();
    if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, [selectedVoice]);

  const updateReadingTime = useCallback(() => {
    const wordsPerMinute = 150; // Average reading speed
    const wordCount = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    setReadingTime(minutes);
  }, [text]);

  useEffect(() => {
    updateReadingTime();
  }, [text, updateReadingTime]);

  const createUtterance = useCallback(() => {
    const newUtterance = new SpeechSynthesisUtterance(text);
    if (selectedVoice) {
      newUtterance.voice = selectedVoice;
    }
    newUtterance.volume = volume;
    newUtterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };
    utteranceRef.current = newUtterance;
  }, [text, selectedVoice, volume]);

  useEffect(() => {
    createUtterance();
  }, [createUtterance]);

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleVoiceChange = (e) => {
    const voice = voices.find((v) => v.name === e.target.value);
    setSelectedVoice(voice);
  };

  const speakText = () => {
    if (text.trim() === '') return;

    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }

    createUtterance();
    setIsSpeaking(true);
    setIsPaused(false);
    window.speechSynthesis.speak(utteranceRef.current);
  };

  const pauseSpeech = () => {
    if (window.speechSynthesis.speaking && !isPaused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    } else if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  };

  const stopSpeech = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  };

  return (
    <div className="p-3 overflow-hidden h-[94vh] font-sans bg-primaryVariant dark:bg-bg dark:text-primary max-md:overflow-auto">
      <div className="relative flex flex-col items-start justify-between gap-2 mb-1 md:gap-2 md:flex-row md:items-center">
        <div className="flex items-center">
          <h1 className="font-serif text-3xl font-bold sm:text-2xl text-bg dark:text-primary">Text to Speech</h1>
          <div 
            className="relative ml-2"
            onMouseEnter={() => setShowPopup(true)}
            onMouseLeave={() => setShowPopup(false)}
          >
            <FaQuestionCircle className="text-xl cursor-pointer text-bgVariant dark:textColor" />
            {showPopup && (
              <div className="absolute left-0 z-10 p-4 text-sm text-left bg-white rounded-lg shadow-lg w-72 text-bg dark:bg-bg-variant dark:text-primary hover:cursor-default">
                <p><strong>Enhanced Text to Speech</strong> allows you to convert text to speech with various customization options.</p>
                <ul className="list-disc list-inside">
                  <li>Choose from available English voices</li>
                  <li>Adjust volume</li>
                  <li>Play, pause, and stop speech</li>
                  <li>Learn more on the <Link to="/" className="text-primary hover:underline">landing page</Link>.</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6 mt-1">
        <div className="flex flex-col w-full">
          <div className="overflow-y-auto bg-white border-2 rounded-md scrollbar-thin scrollbar-thumb-bgVariant scrollbar-track-primary border-bg" style={{ height: '77vh' }}>
            <textarea
              className="w-full h-full p-4 resize-none focus:outline-none"
              placeholder="Enter text to convert to speech..."
              value={text}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 mt-3 text-sm">
            <div className="flex flex-wrap gap-2">
              {[ 
                { icon: FaPlay, text: "Play", onClick: speakText, disabled: isSpeaking && !isPaused },
                { icon: isPaused ? FaPlay : FaPause, text: isPaused ? "Resume" : "Pause", onClick: pauseSpeech, disabled: !isSpeaking },
                { icon: FaStop, text: "Stop", onClick: stopSpeech, disabled: !isSpeaking && !isPaused },
              ].map((btn, index) => (
                <button 
                  key={index}
                  disabled={btn.disabled}
                  className="flex items-center gap-2 px-4 py-1 text-sm font-semibold text-white transition shadow-md rounded-xl bg-bgVariant duration-400 hover:bg-primary hover:text-text-color disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={btn.onClick}
                >
                  <btn.icon className="text-lg" />{btn.text}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <select 
                className="px-3 py-1 text-sm font-semibold rounded-md bg-bg text-primary"
                value={selectedVoice ? selectedVoice.name : ''}
                onChange={handleVoiceChange}
              >
                {voices.map((voice) => (
                  <option key={voice.name} value={voice.name}>
                    {voice.name}
                  </option>
                ))}
              </select>
              <span className="px-4 py-1 rounded-md bg-bg text-primary">
                Reading Time: {readingTime} min
              </span>
              <div className="flex items-center gap-2">
                <FaVolumeDown className="text-lg" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-24 accent-primary"
                />
                <FaVolumeUp className="text-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TTS;