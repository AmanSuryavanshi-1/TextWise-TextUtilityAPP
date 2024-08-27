<<<<<<< HEAD
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
=======
// import React from 'react'
// import Sidebar from './Components/Sidebar';
// import { Outlet } from 'react-router-dom';

// const AppLayout = () => {
//   return (
//     <div className="flex">
//       <div className="w-[15vw]">
//         <Sidebar />
//       </div>
//       <div className="w-[85vw]">
//         <Outlet/>
//       </div>
//     </div>
//   );
// }

// export default AppLayout
>>>>>>> 2ee765bbb47141a87e10c4b7e37dacf8fef097b5


