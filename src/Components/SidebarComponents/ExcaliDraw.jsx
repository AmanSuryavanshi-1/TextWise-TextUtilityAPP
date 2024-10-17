import React, { useState } from 'react';
import { Excalidraw } from '@excalidraw/excalidraw';
import { FaQuestionCircle } from 'react-icons/fa';
import { SiExcalidraw } from 'react-icons/si';

const ExcaliDraw = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="p-4 h-[94vh] overflow-y-auto font-sans bg-primaryVariant dark:bg-bg dark:text-primary">
      <div className="relative flex flex-col items-start justify-between gap-2 md:gap-2 md:flex-row md:items-center">
        <div className="flex items-center mb-2">
          <h1 className="flex font-serif text-4xl font-bold sm:text-3xl text-bg dark:text-primary">
            <SiExcalidraw className="mt-1 mr-2 text-2xl" />
            ExcaliDraw Editor
          </h1>
          <div
            className="relative ml-2"
            onMouseEnter={() => setShowPopup(true)}
            onMouseLeave={() => setShowPopup(false)}
          >
            <FaQuestionCircle className="text-2xl cursor-pointer text-bgVariant" />
            {showPopup && (
              <div className="absolute left-0 z-10 p-4 font-serif text-left border-2 rounded-lg shadow-2xl max-md:w-60 max-md:top-8 max-md:-left-48 bg-primary border-bg text-md w-96 text-bg dark:bg-bg-variant dark:text-primary hover:cursor-default">
              <p><strong>ExcaliDraw Editor</strong> is a versatile tool for creating sketches and diagrams:</p>
              <ul className="list-disc list-inside">
                <li><strong>Easy Drawing:</strong> Create freehand sketches, diagrams, and wireframes using simple tools.</li>
                <li><strong>Real-time Collaboration:</strong> Work with others simultaneously in real-time.</li>
                <li><strong>Export Options:</strong> Easily export your drawings as PNG, SVG, or share a link to collaborate.</li>
                <li><strong>Infinite Canvas:</strong> No size limitations, providing flexibility for large or detailed projects.</li>
              </ul>
            </div>
            
            
            )}
          </div>
        </div>
      </div>

      <div className="overflow-y-auto bg-white border-2 rounded-md scrollbar-thin scrollbar-thumb-bgVariant scrollbar-track-primary border-bg" style={{ height: '81vh' }}>
        <Excalidraw />
      </div>
    </div>
  );
};

export default ExcaliDraw;
