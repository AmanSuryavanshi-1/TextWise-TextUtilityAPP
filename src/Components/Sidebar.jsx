import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaEdit, FaTools, FaLanguage, FaMicrophone, FaRobot, FaStickyNote } from 'react-icons/fa';
import { MdKeyboardArrowDown } from 'react-icons/md';

const Sidebar = () => {
  const [dropdowns, setDropdowns] = useState({
    notes: false,
    transcribe: false,
    aiTexting: false,
  });

  const toggleDropdown = (key) => {
    setDropdowns(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const SidebarItem = ({ to, icon, children }) => (
    <NavLink 
      to={to} 
      exact 
      className="flex items-center m-2 transition-colors duration-300 rounded-lg cursor-pointer text-bg hover:text-bg-variant"
    >
      <span className="mr-2">{icon}</span>
      <p>{children}</p>
    </NavLink>
  );

  const DropdownSection = ({ title, icon, isOpen, toggleOpen, children }) => (
    <div className="relative">
      <div 
        onClick={toggleOpen} 
        className="flex items-center justify-between p-2 m-2 transition-colors duration-300 rounded-lg cursor-pointer text-bg hover:text-bg-variant"
      >
        <div className="flex items-center">
          <span className="mr-2">{icon}</span>
          <p>{title}</p>
        </div>
        <MdKeyboardArrowDown className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      <div className={`ml-4 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-40' : 'max-h-0'}`}>
        {children}
      </div>
    </div>
  );

  return (
    <section className="flex flex-col bg-primary overflow-y-auto scrollbar-thin scrollbar-thumb-bg-variant scrollbar-track-transparent scroll-smooth w-[11.25em]">
      <div className="flex flex-col flex-grow text-sm">
        <SidebarItem to="texteditor" icon={<FaEdit />}>Editor</SidebarItem>
        <SidebarItem to="textutils" icon={<FaTools />}>Text Utils</SidebarItem>
        <SidebarItem to="transliteration" icon={<FaLanguage />}>Transliteration</SidebarItem>

        <DropdownSection 
          title="Transcribe" 
          icon={<FaMicrophone />}
          isOpen={dropdowns.transcribe} 
          toggleOpen={() => toggleDropdown('transcribe')}
        >
          <SidebarItem to="stt">Speech➜Text</SidebarItem>
          <SidebarItem to="tts">Text➜Speech</SidebarItem>
        </DropdownSection>

        <DropdownSection 
          title="AI Texting" 
          icon={<FaRobot />}
          isOpen={dropdowns.aiTexting} 
          toggleOpen={() => toggleDropdown('aiTexting')}
        >
          <SidebarItem to="ai-texting/x">Summarizer</SidebarItem>
          <SidebarItem to="ai-texting/y">Grammar</SidebarItem>
        </DropdownSection>

        <DropdownSection 
          title="Notes" 
          icon={<FaStickyNote />}
          isOpen={dropdowns.notes} 
          toggleOpen={() => toggleDropdown('notes')}
        >
          <SidebarItem to="notes/x">Notes 1</SidebarItem>
          <SidebarItem to="notes/y">Notes 2</SidebarItem>
          <SidebarItem to="notes/z">Notes 3</SidebarItem>
        </DropdownSection>
     </div>
    </section>
  );
}

export default Sidebar;
