import React, { useState } from 'react'
import { FaYoutube, FaFileAlt, FaQuestionCircle, FaSyncAlt } from 'react-icons/fa'
import { HiTranslate } from 'react-icons/hi'

export default function Component() {
  const [input, setInput] = useState('')
  const [summary, setSummary] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [inputType, setInputType] = useState('text')

  const handleInputChange = (e) => {
    setInput(e.target.value)
  }

  const handleInputTypeChange = (type) => {
    setInputType(type)
    setInput('')
    setSummary('')
  }

  const extractVideoId = (url) => {
    const urlObj = new URL(url)
    return urlObj.searchParams.get('v')
  }

  // Placeholder function for fetching YouTube transcript (if captions are available)
  const getYoutubeTranscript = async (videoId) => {
    const apiKey = 'YOUR_YOUTUBE_API_KEY' // Replace with your YouTube API key
    const url = `https://www.googleapis.com/youtube/v3/captions?part=snippet&videoId=${videoId}&key=${apiKey}`

    try {
      const response = await fetch(url)
      const data = await response.json()
      const transcript = data.items.map(item => item.snippet.text).join(' ')
      return transcript
    } catch (error) {
      console.error('Error fetching YouTube transcript:', error)
      return null
    }
  }

  const summarizeWithGemini = async (inputText) => {
    const apiUrl = 'https://gemini-api.com/summarize' // Replace with the actual Gemini API endpoint
    const apiKey = 'AIzaSyAUQJVXQg-7OQ_MUvAP03Tz-xoL2P-PW8Q' // Ensure you insert your API key here

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({ text: inputText })
      })
      const data = await response.json()
      return data.summary
    } catch (error) {
      console.error('Error summarizing with Gemini:', error)
      return 'Failed to summarize. Please check your API key or input.'
    }
  }

  const summarize = async () => {
    setIsLoading(true)
    setSummary('')

    try {
      let transcriptOrText = input
      if (inputType === 'youtube') {
        const videoId = extractVideoId(input)
        transcriptOrText = await getYoutubeTranscript(videoId)
      }

      const generatedSummary = await summarizeWithGemini(transcriptOrText)
      setSummary(generatedSummary)
    } catch (error) {
      console.error('Summarization failed:', error)
      setSummary('An error occurred while generating the summary. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-4 h-[94vh] overflow-y-auto font-sans bg-primaryVariant dark:bg-bg dark:text-primary">
      <div className="relative flex flex-col items-start justify-between gap-2 md:gap-2 md:flex-row md:items-center">
        <div className="flex items-center">
          <h1 className="flex font-serif text-4xl font-bold sm:text-3xl text-bg dark:text-primary">
            <HiTranslate className="mr-2 text-2xl" />
            Summarization
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
                  <strong>Summarization Tool</strong> provides concise summaries:
                </p>
                <ul className="list-disc list-inside">
                  <li>Summarize YouTube videos</li>
                  <li>Summarize text paragraphs</li>
                  <li>Quick and efficient summaries</li>
                  <li>Easy-to-use interface</li>
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
              <div className="flex gap-2">
                <button
                  className={`px-4 py-2 text-sm font-semibold transition border-[2.5px] shadow-md border-bg rounded-xl ${
                    inputType === 'text'
                      ? 'bg-bg text-primary'
                      : 'bg-primary text-bg'
                  }`}
                  onClick={() => handleInputTypeChange('text')}
                >
                  <FaFileAlt className="inline mr-2" />
                  Text
                </button>
                <button
                  className={`px-4 py-2 text-sm font-semibold transition border-[2.5px] shadow-md border-bg rounded-xl ${
                    inputType === 'youtube'
                      ? 'bg-bg text-primary'
                      : 'bg-primary text-bg'
                  }`}
                  onClick={() => handleInputTypeChange('youtube')}
                >
                  <FaYoutube className="inline mr-2" />
                  YouTube
                </button>
              </div>
            </div>
            <textarea
              className="w-full h-[30vh] p-4 bg-white border-2 rounded-md scrollbar-thin scrollbar-thumb-bgVariant scrollbar-track-primary border-bg resize-none"
              value={input}
              onChange={handleInputChange}
              placeholder={inputType === 'youtube' ? "Enter YouTube video URL..." : "Enter text to summarize..."}
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 mx-5 mt-1 text-sm">
          <div className="flex flex-wrap gap-3">
            <button
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold transition border-[2.5px] text-white shadow-md border-bg rounded-xl duration-400 bg-bg hover:bg-primaryVariant hover:text-bg disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={summarize}
              disabled={isLoading || !input.trim()}
            >
              <FaSyncAlt className={`text-lg ${isLoading ? 'animate-spin' : ''}`} />
              {isLoading ? 'Summarizing...' : 'Summarize'}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-5 mx-5 mt-4 md:flex-row">
          <div className="w-full">
            <h2 className="mb-2 text-xl font-semibold">Summary</h2>
            <textarea
              className="w-full h-[30vh] p-4 bg-white border-2 rounded-md scrollbar-thin scrollbar-thumb-bgVariant scrollbar-track-primary border-bg resize-none"
              value={summary}
              readOnly
              placeholder="The summary will appear here..."
            />
          </div>
        </div>
      </div>
    </div>
  )
}



// gemini api key -> AIzaSyAUQJVXQg-7OQ_MUvAP03Tz-xoL2P-PW8Q