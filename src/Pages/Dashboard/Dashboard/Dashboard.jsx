import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";

const Dashboard = () => {
  return (
    <div className=' lg:min-h-screen md:flex '>
      {/* Sidebar */}
      <Sidebar />

      {/* Outlet --> Dynamic content */}
      <div className='flex-1 md:ml-80 md:mr-2'>
        <div className='p-5'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 