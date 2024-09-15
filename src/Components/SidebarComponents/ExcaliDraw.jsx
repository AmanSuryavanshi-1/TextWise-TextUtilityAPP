import React, { useState } from 'react';
import { Excalidraw } from '@excalidraw/excalidraw';
import { FaQuestionCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ExcaliDraw = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="p-3 overflow-hidden font-sans bg-primaryVariant dark:bg-bg dark:text-primary max-md:overflow-auto">
      <div className="flex items-center mb-1">
        <h1 className="font-serif text-3xl font-bold sm:text-2xl text-bg dark:text-primary">ExcaliDraw Editor</h1>
        <div 
          className="relative ml-2"
          onMouseEnter={() => setShowPopup(true)}
          onMouseLeave={() => setShowPopup(false)}
        >
          <FaQuestionCircle className="text-xl cursor-pointer text-bgVariant dark:textColor" />
          {showPopup && (
            <div className="absolute left-0 z-10 p-4 text-sm text-left bg-white rounded-lg shadow-lg w-72 text-bg dark:bg-bg-variant dark:text-primary hover:cursor-default">
              <p><strong>ExcaliDraw Editor</strong> is a feature-rich drawing and diagramming tool.</p>
              <ul className="list-disc list-inside">
                <li>Create diagrams, sketches, and drawings</li>
                <li>Collaborate in real-time</li>
                <li>Export your creations</li>
                <li>Learn more on the <Link to="/" className="text-primary hover:underline">landing page</Link>.</li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="overflow-y-auto bg-white border-2 rounded-md scrollbar-thin scrollbar-thumb-bgVariant scrollbar-track-primary border-bg" style={{ height: '83vh' }}>
        <Excalidraw />
      </div>
    </div>
  );
};

export default ExcaliDraw;