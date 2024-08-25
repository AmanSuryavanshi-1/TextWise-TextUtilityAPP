import React from 'react'
// import 'regenerator-runtime/runtime'  // For speech to text

import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import './index.css'
import HomePage from './Pages/HomePage';
import About from './Pages/About';
import Contact from './Pages/Contact';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
// import AppLayout from './AppLayout';
import TakeNotes from './Components/SidebarComponents/TakeNotes';
import TextUtils from './Components/SidebarComponents/TextUtils';
import Summarizer from './Components/SidebarComponents/Summarizer';
import AI_Texting from './Components/SidebarComponents/AI_Texting';
import STT from './Components/SidebarComponents/STT';
import TTS from './Components/SidebarComponents/TTS';
import Transliteration from './Components/SidebarComponents/Translitration';
import TextEditor from './Components/SidebarComponents/TextEditor';
import Auth from './Pages/Auth';
import Error from './Pages/Error';
import Sidebar from './Components/Sidebar';

const Layout = () => {
  return (
    <div className="mainBody">
      <Sidebar />
      <section>
        <Outlet />
      </section>
    </div>
  );
};

const router = createBrowserRouter([
  {
  path:'/',
  element: <HomePage/>,
          children: [ 
              { path: "about", element: <About /> },
              { path: "contact", element: <Contact />},
              // { path: "issue", element: <Issue />},
              { path: "auth", element: <Auth />},
              {
                path:'/layout',
                element: <Layout/>,
                children: [ 
                  { path: "notes", element: <TakeNotes /> },
                  { path: "textutils", element: <TextUtils /> },
                  { path: "summarizer", element: <Summarizer/>},
                  { path: "aitexting", element: <AI_Texting/>},
                  { path: "stt", element: <STT/> },
                  { path: "tts", element: <TTS/> },
                  { path: "transliteration", element: <Transliteration/>},
                  { path: "editor", element: <TextEditor/>},
              ],
              },
          ],
          errorElement: <Error/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
    {/* <App /> */}
  </React.StrictMode>,
)
