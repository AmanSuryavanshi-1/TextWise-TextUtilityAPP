import React, { useState } from 'react'
import Sidebar from './Components/Sidebar';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  return (
      <div className="flex flex-1 bg-primaryVariant">
        <Sidebar onToggle={setIsSidebarExpanded} />
        <main className={`flex-1 overflow-hidden transition-all duration-300 ${isSidebarExpanded ? 'ml-[15vw]' : 'ml-[5vw]'}`}>
            <Outlet />
        </main>
      </div>
  );
}

export default AppLayout

