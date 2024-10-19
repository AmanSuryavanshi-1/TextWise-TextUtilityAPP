'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { FaPlay, FaPause, FaStop, FaVolumeUp, FaVolumeDown, FaQuestionCircle } from 'react-icons/fa'
import { MdRecordVoiceOver } from 'react-icons/md'

export default function TTS() {
  const [text, setText] = useState('')
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [voices, setVoices] = useState([])
  const [selectedVoice, setSelectedVoice] = useState(null)
  const [volume, setVolume] = useState(1)
  const [readingTime, setReadingTime] = useState(0)
  const [showPopup, setShowPopup] = useState(false)
  const utteranceRef = useRef(null)

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices().filter(voice => 
        ['en', 'hi', 'es', 'zh', 'ta', 'bn', 'sa'].some(lang => voice.lang.startsWith(lang))
      )
      setVoices(availableVoices)
      if (!selectedVoice && availableVoices.length > 0) {
        setSelectedVoice(availableVoices[0])
      }
    }

    loadVoices()
    if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoices
    }
  }, [selectedVoice])

  const updateReadingTime = useCallback(() => {
    const wordsPerMinute = 150 // Average reading speed
    const wordCount = text.trim().split(/\s+/).length
    const minutes = Math.ceil(wordCount / wordsPerMinute)
    setReadingTime(minutes)
  }, [text])

  useEffect(() => {
    updateReadingTime()
  }, [text, updateReadingTime])

  const createUtterance = useCallback(() => {
    const newUtterance = new SpeechSynthesisUtterance(text)
    if (selectedVoice) {
      newUtterance.voice = selectedVoice
    }
    newUtterance.volume = volume
    newUtterance.onend = () => {
      setIsSpeaking(false)
      setIsPaused(false)
    }
    utteranceRef.current = newUtterance
  }, [text, selectedVoice, volume])

  useEffect(() => {
    createUtterance()
  }, [createUtterance])

  const handleInputChange = (e) => {
    setText(e.target.value)
  }

  const handleVoiceChange = (e) => {
    const voice = voices.find((v) => v.name === e.target.value)
    setSelectedVoice(voice)
  }

  const speakText = () => {
    if (text.trim() === '') return

    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel()
    }

    createUtterance()
    setIsSpeaking(true)
    setIsPaused(false)
    window.speechSynthesis.speak(utteranceRef.current)
  }

  const pauseSpeech = () => {
    if (window.speechSynthesis.speaking && !isPaused) {
      window.speechSynthesis.pause()
      setIsPaused(true)
    } else if (isPaused) {
      window.speechSynthesis.resume()
      setIsPaused(false)
    }
  }

  const stopSpeech = () => {
    window.speechSynthesis.cancel()
    setIsSpeaking(false)
    setIsPaused(false)
  }

  return (
    <div className="p-4 h-[94vh] overflow-y-auto font-sans bg-primaryVariant dark:bg-bg dark:text-primary">
      <div className="relative flex flex-col items-start justify-between gap-2 md:gap-2 md:flex-row md:items-center">
        <div className="flex items-center">
          <h1 className="flex font-serif text-4xl font-bold sm:text-3xl text-bg dark:text-primary">
            <MdRecordVoiceOver className="mt-2 mr-2 text-2xl"/>
            Text to Speech
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
                  <strong>Text to Speech Tool</strong> converts text to speech:
                </p>
                <ul className="list-disc list-inside">
                  <li>Choose from available voices for multiple languages</li>
                  <li>Adjust volume</li>
                  <li>Play, pause, and stop speech</li>
                  <li>Estimated reading time</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex flex-col gap-5 mx-5 md:flex-row">
          <div className="w-full">
            <div className="flex justify-between my-3">
              <select
                className="px-2 py-1 text-sm font-semibold border-[2.5px] border-bg rounded-lg scrollbar-thin scrollbar-thumb-primaryVariant bg-primary text-bg max-w-[200px]"
                value={selectedVoice ? selectedVoice.name : ''}
                onChange={handleVoiceChange}
              >
                {voices.map((voice) => (
                  <option key={voice.name} value={voice.name}>
                    {voice.name} ({voice.lang})
                  </option>
                ))}
              </select>
            </div>
            <textarea
              className="w-full h-[63vh] p-4 bg-white border-2 rounded-md scrollbar-thin scrollbar-thumb-bgVariant scrollbar-track-primary border-bg resize-none"
              value={text}
              onChange={handleInputChange}
              placeholder="Enter text to convert to speech..."
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 mx-5 mt-1 text-sm">
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 px-4 py-2 text-sm font-serif font-semibold transition border-[2.5px] shadow-md border-bg rounded-xl bg-primaryVariant text-bg">
              Reading Time: {readingTime} min
            </div>    

            <button
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold transition border-[2.5px] text-white shadow-md border-bg rounded-xl duration-400 bg-bg hover:bg-primaryVariant hover:text-bg disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={speakText}
              disabled={isSpeaking && !isPaused}
            >
              <FaPlay className="text-lg" /> Play
            </button>

            <button
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold transition border-[2.5px] text-white shadow-md border-bg rounded-xl duration-400 bg-bg hover:bg-primaryVariant hover:text-bg disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={pauseSpeech}
              disabled={!isSpeaking}
            >
              {isPaused ? <FaPlay className="text-lg" /> : <FaPause className="text-lg" />}
              {isPaused ? 'Resume' : 'Pause'}
            </button>

            <button
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold transition border-[2.5px] text-white shadow-md border-bg rounded-xl duration-400 bg-bg hover:bg-primaryVariant hover:text-bg disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={stopSpeech}
              disabled={!isSpeaking && !isPaused}
            >
              <FaStop className="text-lg" /> Stop
            </button>
          </div>

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
  )
}
