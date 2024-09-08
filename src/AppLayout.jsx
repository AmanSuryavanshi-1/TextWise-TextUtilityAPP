import React from 'react'
import Sidebar from './Components/Sidebar';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <div className="flex">
        <Sidebar />
      <main>
        <Outlet/>
      </main>
    </div>
  );
}

export default AppLayout

