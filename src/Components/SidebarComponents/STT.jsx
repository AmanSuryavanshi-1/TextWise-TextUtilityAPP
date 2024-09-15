// import React, { useEffect, useRef, useState } from 'react'
// // import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

// const STT = () => {

//     const {
//         transcript,
//         listening,
//         resetTranscript,
//         browserSupportsSpeechRecognition,
//         language
//       } = useSpeechRecognition();
    
//        // For showing copied message
//        const [copied, setCopied] = useState(false);
    
//       // For Continuous listening until stopped
//       const [micOn, setMicOn] = useState(false);
    
//       const toggleListening = () => {
//         // Ensures continuous listening
//         if (!micOn) {
//           SpeechRecognition.startListening({ continuous: true });
//         } else {
//           SpeechRecognition.stopListening();
//         }
//         setMicOn(!micOn);
//       };
    
//       if (!browserSupportsSpeechRecognition) {
//         return <span>Browser doesn't support speech recognition.</span>;
//       }
    
//       // Change Language Dropdown
//       const handleChangeLanguage = (selectedLanguage) => {
//         // SpeechRecognition.stopListening();
//         if (micOn) {
//           toggleListening(); // Stop listening if mic is on
//         }
//         SpeechRecognition.startListening({ continuous: true, language: selectedLanguage });
//       }
      
    
//       // Auto Scroll
//       const chatAreaRef = useRef(null);
//      useEffect(() => {
//         // Scroll to bottom whenever transcript updates
//         if (chatAreaRef.current) {
//           chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
//         }
//       }, [transcript])
    
//       // Copy to Clipboard 
//       const copyToClipboard = () =>{
//         navigator.clipboard.writeText(transcript);
//         setCopied(true);
//         // Hide the message after 3 seconds
//         setTimeout(() => {
//           setCopied(false);
//         }, 3000);
//       }

      
//   return (
//     <div className='sidebar_components'>

//       <div className="SpeechToText">
//       <h1>Speech to Text Converter</h1>
//       <p className='SpeechToText_Desc'> React hook that utilizes the browser's Web Speech API to convert speech from the microphone to text. This hook support two languages: English and Hindi. Users can easily copy the transcribed text to their clipboard for further use</p>

//         <div className="main-SpeechToText" ref={chatAreaRef}>
//           {transcript}
//         </div>
        
//       <div className="btn-style">
//         {/* Language dropdown */}
//               <h4>Language : 
//                <select value={language} className="btn btn-primary" onChange={(e) => handleChangeLanguage(e.target.value)}>
//                   <option value="en">English</option>
//                   <option value="hi">Hindi</option>
//                </select>
//               </h4>
//       <h4 className="mic" > {listening ? 'LISTENING' : ''}</h4>
        
//         <div className="actionBtn">
//         <button className="btn btn-primary" onClick={toggleListening}>
//               {micOn ? 'Stop' : 'Start'}
//         </button>
//         <button className="btn btn-primary" onClick={resetTranscript}>Reset</button>
//         <button className="btn btn-primary" onClick={copyToClipboard}>{copied ? <div className="copied-message">Copied!</div>:"Copy"}</button>
//         </div>
//       </div>
// </div>
//     </div>
//   )
// }

// export default STT