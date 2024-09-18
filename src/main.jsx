import 'regenerator-runtime/runtime'  // For speech to text must be at top

import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import './index.css'
import HomePage from './Pages/HomePage';
import About from './Pages/About';
import Contact from './Pages/Contact';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './AppLayout';

import TakeNotes from './Components/SidebarComponents/TakeNotes';
import Summarizer from './Components/SidebarComponents/Summarizer';
import AI_Texting from './Components/SidebarComponents/AI_Texting';
import STT from './Components/SidebarComponents/STT';
import TTS from './Components/SidebarComponents/TTS';
import Transliteration from './Components/SidebarComponents/Transliteration';
import Auth from './Pages/Auth';
import Error from './Pages/Error';
import LandingPage from './Pages/LandingPage';
import TextToolkit from './Components/SidebarComponents/TextToolkit';
import ShimmerAbout from './Shimmer/ShimmerAbout';
import ReportIssue from './Pages/ReportIssue';
import Grammar from './Components/SidebarComponents/Grammar';
import QuillTextEditor from './Components/SidebarComponents/QuillTextEditor';
import ExcaliDraw from './Components/SidebarComponents/ExcaliDraw';
import Translation from './Components/SidebarComponents/Translation';



// const Layout = () => {
//   return (
//     <div className="mainBody">
//       <Sidebar />
//       <section>
//         <Outlet />
//       </section>
//     </div>
//   );
// };

const router = createBrowserRouter([
  {
  path:'/',
  element: <HomePage/>,
          children: [ 
            { path: "/about", 
              element: ( 
              <Suspense fallback={
                  <div className="loading-fallback"> <ShimmerAbout/></div>}>
                <About/> 
              </Suspense>) 
            },
              { path: "contact", element: <Contact />},
              { path: "LandingPage", element: <LandingPage />},
              { path: "issue", element: <ReportIssue />},
              { path: "auth", element: <Auth />},
              {
                path:'layout',
                element: <AppLayout/>,
               children: [ 
                  { path: "notes", element: <TakeNotes /> },
                  { path: "text-toolkit", element: <TextToolkit /> },
                  { path: "ai-texting", element: <AI_Texting/>},
                  { path: "ai-texting/summarizer", element: <Summarizer/>},
                  { path: "ai-texting/grammar", element: <Grammar />},
                  { path: "stt", element: <STT/> },
                  { path: "tts", element: <TTS/> },
                  { path: "transliteration", element: <Transliteration/>},
                  { path: "translation", element: <Translation/>},
                  { path: "editor", element: <QuillTextEditor/>},
                  { path: "excalidraw", element: <ExcaliDraw/>},
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
