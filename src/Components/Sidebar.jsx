import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FaEdit, FaTools, FaLanguage, FaMicrophone, FaRobot, FaStickyNote, FaPencilRuler } from 'react-icons/fa';
import { MdKeyboardArrowDown, MdSummarize, MdGrading, MdRecordVoiceOver, MdKeyboardVoice, MdMenu, MdClose } from 'react-icons/md';

const Sidebar = ({ onToggle }) => {
  const location = useLocation();
  const [dropdowns, setDropdowns] = useState({
    notes: false,
    transcribe: false,
    aiTexting: false,
  });
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  const toggleDropdown = (key) => {
    setDropdowns(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    onToggle(!isExpanded);
  };

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 640;
      setIsMobile(mobile);
      if (mobile && isExpanded) {
        setIsExpanded(false);
        onToggle(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [onToggle, isExpanded]);

  const NavItem = ({ to, icon: Icon, children }) => (
    <NavLink 
      to={to} 
      className={({ isActive }) => `
        flex items-center px-4 py-2 text-sm transition-all duration-200 rounded-full
        ${isActive 
          ? 'bg-bg text-white shadow-md border-primaryVariant border-b-2' 
          : 'text-primaryVariant hover:text-white hover:bg-primary'
        }
      `}
    >
      {({ isActive }) => (
        <>
          <Icon className={`w-5 h-5 ${isActive ? 'text-white' : ''} ${isExpanded ? 'mr-3' : ''}`} />
          {isExpanded && <span>{children}</span>}
        </>
      )}
    </NavLink>
  );

  const DropdownSection = ({ title, icon: Icon, isOpen, toggleOpen, children, path }) => {
    const active = location.pathname.startsWith(path);
    return (
      <div className="relative">
        <div
          onClick={toggleOpen}
          className={`
            flex items-center justify-between px-4 py-2 text-sm cursor-pointer transition-all duration-200 rounded-full
            ${active
              ? 'bg-bg text-white shadow-md border-primaryVariant border-b-2' 
              : 'text-primaryVariant hover:text-white hover:bg-primary'
            }
          `}
        >
          <div className="flex items-center">
            <Icon className={`w-5 h-5 ${active ? 'text-white' : ''} ${isExpanded ? 'mr-3' : ''}`} />
            {isExpanded && <span>{title}</span>}
          </div>
          {isExpanded && (
            <MdKeyboardArrowDown className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
          )}
        </div>
        {isExpanded && (
          <div className={`ml-4 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-40' : 'max-h-0'}`}>
            {children}
          </div>
        )}
      </div>
    );
  };

  const sidebarContent = (
    <>
      <div className="flex items-center justify-between p-4 mt-6">
        <span className={`text-white font-bold font-serif ${isExpanded ? 'block' : 'hidden'}`}>Menu</span>
        <button onClick={toggleExpand} className="p-2 text-white rounded-full hover:bg-primary">
          {isExpanded ? <MdClose size={24} /> : <MdMenu size={24} />}
        </button>
      </div>
      <div className="flex flex-col p-2 space-y-1">
        <NavItem to="editor" icon={FaEdit}>Editor</NavItem>
        <NavItem to="text-toolkit" icon={FaTools}>Text Toolkit</NavItem>
        <NavItem to="excalidraw" icon={FaPencilRuler}>ExcaliDraw</NavItem>
        <NavItem to="transliteration" icon={FaLanguage}>Transliteration</NavItem>
        <NavItem to="translation" icon={FaLanguage}>Translation</NavItem>

        {/* <DropdownSection
          title="Transcribe"
          icon={FaMicrophone}
          isOpen={dropdowns.transcribe}
          toggleOpen={() => toggleDropdown('transcribe')}
          path="/transcribe"
        > */}
          <NavItem to="stt" icon={MdKeyboardVoice}>Speech➜Text</NavItem>
          <NavItem to="tts" icon={MdRecordVoiceOver}>Text➜Speech</NavItem>
        {/* </DropdownSection> */}

        {/* <DropdownSection
          title="AI Texting"
          icon={FaRobot}
          isOpen={dropdowns.aiTexting}
          toggleOpen={() => toggleDropdown('aiTexting')}
          path="/ai-texting"
        > */}
          <NavItem to="ai-texting/summarizer" icon={MdSummarize}>Summarizer</NavItem>
          <NavItem to="ai-texting/grammar" icon={MdGrading}>Grammar</NavItem>
        {/* </DropdownSection> */}

        <DropdownSection
          title="Notes"
          icon={FaStickyNote}
          isOpen={dropdowns.notes}
          toggleOpen={() => toggleDropdown('notes')}
          path="/notes"
        >
          <NavItem to="notes/x" icon={FaStickyNote}>Note 1</NavItem>
          <NavItem to="notes/y" icon={FaStickyNote}>Note 2</NavItem>
          <NavItem to="notes/z" icon={FaStickyNote}>Note 3</NavItem>
        </DropdownSection>
      </div>
    </>
  );

  return (
    <>
      {/* Sidebar for all screen sizes */}
      <div 
        className={`
          fixed inset-y-0 left-0 z-40 transition-all duration-300
          ${isMobile 
            ? (isExpanded ? 'w-[15vw]' : 'w-[5vw]') 
            : (isExpanded ? 'w-[15vw]' : 'w-[5vw]')
          }
        `}
      >
        <div className={`h-full bg-primaryVariant rounded-r-[2rem] border-primaryVariant overflow-hidden ${isExpanded ? 'bg-opacity-90' : ''}`}>
          <div className="h-full overflow-y-auto bg-bg scrollbar-thin scrollbar-thumb-primary scrollbar-track-transparent">
            {sidebarContent}
          </div>
        </div>
      </div>

      {/* Overlay for mobile when sidebar is expanded */}
      {isMobile && isExpanded && (
        <div className="fixed inset-0 z-30 bg-black bg-opacity-50" onClick={toggleExpand}></div>
      )}
    </>
  );
};

export default Sidebar;