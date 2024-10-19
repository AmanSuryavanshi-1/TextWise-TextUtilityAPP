'use client'

import React, { useState, useEffect, useRef } from 'react'
import { FaMicrophone, FaMicrophoneSlash, FaCopy, FaTrash, FaQuestionCircle, FaMicrophoneAlt } from 'react-icons/fa'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

export default function STT() {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition()

  const [language, setLanguage] = useState('en-US')
  const [copied, setCopied] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [wordCount, setWordCount] = useState(0)
  const textAreaRef = useRef(null)

  useEffect(() => {
    setWordCount(transcript.trim().split(/\s+/).filter(Boolean).length)
  }, [transcript])

  const toggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening()
    } else {
      SpeechRecognition.startListening({ continuous: true, language })
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(transcript)
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    } catch (error) {
      console.error('Failed to copy to clipboard:', error)
    }
  }

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>
  }

  return (
    <div className="p-4 h-[94vh] overflow-y-auto font-sans bg-primaryVariant dark:bg-bg dark:text-primary">
      <div className="relative flex flex-col items-start justify-between gap-2 md:gap-2 md:flex-row md:items-center">
        <div className="flex items-center">
          <h1 className="flex font-serif text-4xl font-bold sm:text-3xl text-bg dark:text-primary">
            <FaMicrophoneAlt className="mt-2 mr-2 text-2xl" />
            Speech to Text
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
                  <strong>Speech to Text Tool</strong> converts speech to text:
                </p>
                <ul className="list-disc list-inside">
                  <li>Supports multiple languages</li>
                  <li>Real-time transcription</li>
                  <li>Copy transcribed text</li>
                  <li>Word count display</li>
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
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="en-US">English (US)</option>
                <option value="hi-IN">Hindi</option>
              </select>
            </div>
            <textarea
              ref={textAreaRef}
              className="w-full h-[63vh] p-4 bg-white border-2 rounded-md scrollbar-thin scrollbar-thumb-bgVariant scrollbar-track-primary border-bg resize-none"
              value={transcript}
              readOnly
              placeholder="Start speaking to see the transcription here..."
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 mx-5 mt-1 text-sm">
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 px-4 py-2 text-sm font-serif font-semibold transition border-[2.5px] shadow-md border-bg rounded-xl bg-primaryVariant text-bg">
              Word count: {wordCount}
            </div>    

            <button
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold transition border-[2.5px] text-white shadow-md border-bg rounded-xl duration-400 bg-bg hover:bg-primaryVariant hover:text-bg"
              onClick={toggleListening}
            >
              {listening ? <FaMicrophoneSlash className="text-lg" /> : <FaMicrophone className="text-lg" />}
              {listening ? 'Stop' : 'Start'}
            </button>

            <button
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold transition border-[2.5px] text-white shadow-md border-bg rounded-xl duration-400 bg-bg hover:bg-primaryVariant hover:text-bg"
              onClick={resetTranscript}
            >
              <FaTrash className="text-lg" /> Reset
            </button>
          </div>

          <div className="flex gap-3">
            <button
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold transition border-[2.5px] text-white shadow-md border-bg rounded-xl duration-400 bg-bg hover:bg-primaryVariant hover:text-bg"
              onClick={copyToClipboard}
              disabled={!transcript}
            >
              <FaCopy className="text-lg" /> {copied ? 'Copied!' : 'Copy'}
            </button>

            <div className="flex items-center gap-2 px-4 py-2 text-sm font-serif font-semibold transition border-[2.5px] shadow-md border-bg rounded-xl bg-primaryVariant text-bg">
              {listening ? 'Listening...' : 'Not Listening'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}