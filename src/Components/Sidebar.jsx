import React, { useState } from 'react';
<<<<<<< HEAD
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
=======
// import './Sidebar.css';
import logo from '../../assets/AV_Main Logo.png';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const [notesDropdownOpen, setNotesDropdownOpen] = useState(false);
  const [transcribeDropdownOpen, setTranscribeDropdownOpen] = useState(false);
  const [aiTextingDropdownOpen, setAiTextingDropdownOpen] = useState(false);
  const [transliterationDropdownOpen, setTransliterationDropdownOpen] = useState(false);

  const toggleNotesDropdown = () => {
    setNotesDropdownOpen(!notesDropdownOpen);
  };

  const toggleTranscribeDropdown = () => {
    setTranscribeDropdownOpen(!transcribeDropdownOpen);
  };

  const toggleAiTextingDropdown = () => {
    setAiTextingDropdownOpen(!aiTextingDropdownOpen);
  };

  const toggleTransliterationDropdown = () => {
    setTransliterationDropdownOpen(!transliterationDropdownOpen);
  };
  
  return (
    <section className="Sidebar">
      <div className="SidebarItems">            
        <NavLink to="texteditor" exact> 
          <p className="SidebarItem">Editor</p>
        </NavLink>   
        <NavLink to="textutils" exact> 
          <p className="SidebarItem">Text Utils</p>
        </NavLink>                      
        <NavLink to="transliteration" exact> 
          <p className="SidebarItem">Transliteration</p>
        </NavLink> 

        <div className="dropdown-section">
          <p onClick={toggleTranscribeDropdown} className="dropdown-toggle SidebarItem">
            Transcribe 
          </p>
          {transcribeDropdownOpen && (
            <div className="dropdown">
              <NavLink to="stt" exact> 
                <p className="SidebarItem">Speech➜Text</p> 
              </NavLink>
              <NavLink to="tts" exact> 
                <p className="SidebarItem">Text➜Speech</p> 
              </NavLink>
            </div>
          )}
        </div>

        <div className="dropdown-section">
          <p onClick={toggleAiTextingDropdown} className="dropdown-toggle SidebarItem">
            AI Texting 
          </p>
          {aiTextingDropdownOpen && (
            <div className="dropdown">
              <NavLink to="ai-texting/x" exact> 
                <div className="SidebarItem">Summarizer</div> 
              </NavLink>
              <NavLink to="ai-texting/y" exact> 
                <div className="SidebarItem">Grammar</div> 
              </NavLink>
            </div>
          )}
        </div>

        <div className="dropdown-section">
          {/* <p onClick={toggleTransliterationDropdown} className="dropdown-toggle SidebarItem">
            Transliteration 
          </p> */}
          {/* {transliterationDropdownOpen && (
            // <div className="dropdown">
            //   <NavLink to="transliteration/x" exact> 
            //     <div className="SidebarItem">X</div> 
            //   </NavLink>
            //   <NavLink to="transliteration/y" exact> 
            //     <div className="SidebarItem">Y</div> 
            //   </NavLink>
            //   <NavLink to="transliteration/z" exact> 
            //     <div className="SidebarItem">Z</div> 
            //   </NavLink>
            // </div>
          )} */}
<div className="dropdown-section">
          <p onClick={toggleNotesDropdown} className="dropdown-toggle SidebarItem">
            Notes 
          </p>
          {notesDropdownOpen && (
            <div className="dropdown">
              <NavLink to="notes/x" exact> 
                <p className="SidebarItem">Notes 1</p> 
              </NavLink>
              <NavLink to="notes/y" exact> 
                <p className="SidebarItem">Notes 2</p> 
              </NavLink>
              <NavLink to="notes/z" exact> 
                <p className="SidebarItem">Notes 3</p> 
              </NavLink>
            </div>
          )}
        </div>
          
        </div>
            
>>>>>>> 2ee765bbb47141a87e10c4b7e37dacf8fef097b5
      </div>
    </section>
  );
}

<<<<<<< HEAD
export default Sidebar;
=======
export default Sidebar;
>>>>>>> 2ee765bbb47141a87e10c4b7e37dacf8fef097b5
