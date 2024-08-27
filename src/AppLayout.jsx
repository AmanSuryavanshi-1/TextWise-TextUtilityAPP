import React from 'react'
import Sidebar from './Components/Sidebar';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <div className="flex">
      <div className="w-[15vw]">
        <Sidebar />
      </div>
      <main className="w-[85vw]">
        <Outlet/>
      </main>
    </div>
  );
}

export default AppLayout


