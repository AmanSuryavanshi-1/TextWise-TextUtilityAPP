import React, { useState } from 'react';
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
            
      </div>
    </section>
  );
}

export default Sidebar;
