import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FaEdit, FaTools, FaLanguage, FaMicrophone, FaRobot, FaStickyNote } from 'react-icons/fa';
import { MdKeyboardArrowDown, MdSummarize, MdGrading, MdRecordVoiceOver, MdKeyboardVoice } from 'react-icons/md';

const Sidebar = () => {
  const location = useLocation();
  const [dropdowns, setDropdowns] = useState({
    notes: false,
    transcribe: false,
    aiTexting: false,
  });

  const toggleDropdown = (key) => {
    setDropdowns(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const NavItem = ({ to, icon: Icon, children, onClick }) => (
    <NavLink 
      to={to} 
      className={({ isActive }) => `
        flex items-center px-3 py-1 text-sm transition-all duration-200
        ${isActive 
          ? 'text-white bg-bg rounded-full shadow-inner border-b-2 border-white' 
          : 'text-primaryVariant hover:text-white hover:bg-bg rounded-full'
        }
      `}
      onClick={onClick}
    >
      {({ isActive }) => (
        <>
          <Icon className={`w-4 h-4 mr-2 ${isActive ? 'text-white' : 'group-hover:text-white'}`} />
          {children}
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
            flex items-center justify-between px-3 py-1 text-sm transition-all duration-200 cursor-pointer
            ${active
              ? 'text-white bg-bg rounded-full shadow-inner border-b-2 border-white'
              : 'text-primaryVariant hover:text-white hover:bg-bg rounded-full'
            }
          `}
        >
          <div className="flex items-center">
            <Icon className={`w-4 h-4 mr-2 ${active ? 'text-white' : 'group-hover:text-white'}`} />
            <p>{title}</p>
          </div>
          <MdKeyboardArrowDown className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
        <div className={`ml-4 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-40' : 'max-h-0'}`}>
          {children}
        </div>
      </div>
    );
  };

  return (
    <div className='bg-primaryVariant'>
    <div className="flex rounded-r-3xl border-2 border-primaryVariant flex-col p-2 overflow-y-auto bg-bg scrollbar-thin scrollbar-thumb-primary scrollbar-track-transparent scroll-smooth w-[15vw] h-[94vh]">
      <div className="flex flex-col flex-grow space-y-1">
        <NavItem to="texteditor" icon={FaEdit}>Editor</NavItem>
        <NavItem to="text-toolkit" icon={FaTools}>Text Utils</NavItem>
        <NavItem to="transliteration" icon={FaLanguage}>Transliteration</NavItem>

        <DropdownSection
          title="Transcribe"
          icon={FaMicrophone}
          isOpen={dropdowns.transcribe}
          toggleOpen={() => toggleDropdown('transcribe')}
          path="/transcribe"
        >
          <NavItem to="stt" icon={MdKeyboardVoice}>Speech➜Text</NavItem>
          <NavItem to="tts" icon={MdRecordVoiceOver}>Text➜Speech</NavItem>
        </DropdownSection>

        <DropdownSection
          title="AI Texting"
          icon={FaRobot}
          isOpen={dropdowns.aiTexting}
          toggleOpen={() => toggleDropdown('aiTexting')}
          path="/ai-texting"
        >
          <NavItem to="ai-texting/x" icon={MdSummarize}>Summarizer</NavItem>
          <NavItem to="ai-texting/y" icon={MdGrading}>Grammar</NavItem>
        </DropdownSection>

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
    </div>
    </div>
  );
}

export default Sidebar;