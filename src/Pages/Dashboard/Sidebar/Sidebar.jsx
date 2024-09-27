import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';
import { IoIosLogOut } from "react-icons/io";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import toast from 'react-hot-toast';
import useGetAllUsersRole from '../../../Hooks/useGetAllUsersRole';
import { PiUsersFourBold } from "react-icons/pi";
import { MdManageAccounts } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdCancel } from "react-icons/md";

const Sidebar = () => {
  const navigate = useNavigate();
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false); // State to manage sidebar visibility
  const handleLogout = () => {
    logOut();
    toast.success('Logged out');
    navigate('/');
  };
  const [role] = useGetAllUsersRole();

  return (
    <nav className="bg-[#121e31] top-0 left-0 py-6 px-4 font-[sans-serif] tracking-wide overflow-auto">
      {/* Menu Button for small screens */}
      <button 
        className="sm:hidden text-white mb-4 flex justify-end  w-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <MdCancel size={30}/> : <GiHamburgerMenu size={30}/>}
      </button>

      {/* Sidebar Content */}
      <div className={`flex flex-col ${isOpen ? 'sm:flex' : 'hidden sm:flex'} transition-all`}>
        <Link to={''} className="flex flex-wrap items-center gap-4 cursor-pointer">
          <img src={user?.photoURL} className="w-10 h-10 rounded-full border-2 border-white" />
          <div>
            <p className="text-sm text-white">{user?.displayName}</p>
            <p className="text-xs text-gray-300 mt-0.5">{user?.email}</p>
          </div>
        </Link>

        <hr className="my-6 border-gray-400" />
        <ul className="space-y-3">
          {/* For all user */}
          <li className="text-white text-sm flex items-center hover:bg-gray-700 rounded px-4 py-3 transition-all">
            <Link to={'/'} className='flex'>
              <FaHome className='mr-2' size={20} />
              Home
            </Link>
          </li>
          <li>
            <Link to={'/dashboard/profile'} className="text-white text-sm flex items-center hover:bg-gray-700 rounded px-4 py-3 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-[18px] h-[18px] mr-4" viewBox="0 0 512 512">
                <path d="M437.02 74.98C388.668 26.63 324.379 0 256 0S123.332 26.629 74.98 74.98C26.63 123.332 0 187.621 0 256s26.629 132.668 74.98 181.02C123.332 485.37 187.621 512 256 512s132.668-26.629 181.02-74.98C485.37 388.668 512 324.379 512 256s-26.629-132.668-74.98-181.02zM111.105 429.297c8.454-72.735 70.989-128.89 144.895-128.89 38.96 0 75.598 15.179 103.156 42.734 23.281 23.285 37.965 53.687 41.742 86.152C361.641 462.172 311.094 482 256 482s-105.637-19.824-144.895-52.703zM256 269.507c-42.871 0-77.754-34.882-77.754-77.753C178.246 148.879 213.13 114 256 114s77.754 34.879 77.754 77.754c0 42.871-34.883 77.754-77.754 77.754zm170.719 134.427a175.9 175.9 0 0 0-46.352-82.004c-18.437-18.438-40.25-32.27-64.039-40.938 28.598-19.394 47.426-52.16 47.426-89.238C363.754 132.34 315.414 84 256 84s-107.754 48.34-107.754 107.754c0 37.098 18.844 69.875 47.465 89.266-21.887 7.976-42.14 20.308-59.566 36.542-25.235 23.5-42.758 53.465-50.883 86.348C50.852 364.242 30 312.512 30 256 30 131.383 131.383 30 256 30s226 101.383 226 226c0 56.523-20.86 108.266-55.281 147.934zm0 0" />
              </svg>
              <span>Profile</span>
            </Link>
          </li>

          {/* Admins links */}
          {role === 'admin' && (
            <>
              <Link to={'all-users'} className="text-white text-sm flex items-center hover:bg-gray-700 rounded px-4 py-3 transition-all">
                <PiUsersFourBold size={20} className='mr-2' />
                All Users
              </Link>
              <Link to={'/dashboard/all-blood-donation-request'} className="text-white text-sm flex items-center hover:bg-gray-700 rounded px-4 py-3 transition-all">
                <IoIosAddCircleOutline size={20} className='mr-2' />
                All Blood Donation Request Page
              </Link>
              <Link to={'content-management'} className="text-white text-sm flex items-center hover:bg-gray-700 rounded px-4 py-3 transition-all">
                <MdManageAccounts size={20} className='mr-2' />
                Content Management Page
              </Link>
            </>
          )}

          {/* Volunteer links */}
          {role === 'volunteer' && (
            <>
              <Link to={'/dashboard/all-blood-donation-request'} className="text-white text-sm flex items-center hover:bg-gray-700 rounded px-4 py-3 transition-all">
                <IoIosAddCircleOutline size={20} className='mr-2' />
                All Blood Donation Request Page
              </Link>
              <Link to={'content-management'} className="text-white text-sm flex items-center hover:bg-gray-700 rounded px-4 py-3 transition-all">
                <MdManageAccounts size={20} className='mr-2' />
                Content Management Page
              </Link>
            </>
          )}

          {/* Donors links */}
          {role === 'donor' && (
            <>
              <Link to={'create-donation-request'} className="text-white text-sm flex items-center hover:bg-gray-700 rounded px-4 py-3 transition-all">
                <IoIosAddCircleOutline size={20} className='mr-2' />
                Blood Donation Request
              </Link>
              <Link to={'my-donation-requests'} className="text-white text-sm flex items-center hover:bg-gray-700 rounded px-4 py-3 transition-all">
                <IoIosAddCircleOutline size={20} className='mr-2' />
                My Donation Requests
              </Link>
            </>
          )}

          {/* Logout Button */}
          <li className="text-white text-sm flex items-center hover:bg-gray-700 rounded px-4 py-3 transition-all">
            <button onClick={handleLogout} className='flex'>
              <IoIosLogOut size={20} className='mr-2' />
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
