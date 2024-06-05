import { useState } from 'react';
import logo from '../../../assets/images/svg.jpg'
import Navitems from './Navitems';
import Container from '../Container/Container';
import useAuth from '../../../Hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
const Navbar = () => {
const navigate = useNavigate()
    const { user,logOut } = useAuth()

    const handleLogout = () => {
        logOut()
       toast.success('logout successful')
        navigate('/login')
    }

    // menu 
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    // toggle menu
    const toggleMenu = () => setMenuOpen(!menuOpen);
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    return (
        <Container>
            <div className=" border  font-roboto">
                <nav className="border-gray-200">
                    <div className=" mx-auto flex flex-wrap items-center justify-between">
                        <a  className="flex">
                            <img className='size-16' src={logo} alt="" />
                            <span className="self-center ml-2 text-lg font-semibold whitespace-nowrap">LifeSource <span className='text-[#e40c13]'>Blood</span> Bank</span>
                        </a>
                        <button
                            data-collapse-toggle="mobile-menu"
                            type="button"
                            className="md:hidden ml-3 text-gray-400 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-lg inline-flex items-center justify-center"
                            aria-controls="mobile-menu-2"
                            aria-expanded={menuOpen}
                            onClick={toggleMenu}
                        >
                            <span className="sr-only">Open main menu</span>
                            {menuOpen ? (
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                </svg>
                            ) : (
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
                                </svg>
                            )}
                        </button>
                        <div className={`${menuOpen ? 'block' : 'hidden'} md:block w-full md:w-auto`} id="mobile-menu">
                            <ul className="flex mr-20 flex-col md:flex-row md:space-x-8  mt-4 md:mt-0 md:text-sm md:font-medium">
                                <li>
                                    <Navitems title={'Home'} path={'/'} />

                                </li>

                                <li>
                                    <Navitems title={'Donation Requests'} path={'/donation-requests'} />

                                </li>
                                <li>
                                    <Navitems title={'Blogs'} path={'content-management'} />
                                </li>
                                <li>
                                    <Navitems title={'Funding'} path={'/f'} />
                                </li>
                               { user ? <li className="relative  mt-4">
                                    <button
                                        id="dropdownNavbarLink"
                                        data-dropdown-toggle="dropdownNavbar"
                                        className="text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0 font-medium flex items-center justify-between w-full md:w-auto"
                                        onClick={toggleDropdown}
                                    >
                                        <div>
                                            <img className="size-12 rounded-full" alt="Tailwind CSS Navbar component" src={user?.photoURL} />
                                        </div>

                                    </button>
                                    <div className={`${dropdownOpen ? 'block' : 'hidden'} absolute bg-white text-base z-10 list-none divide-y divide-gray-100 rounded shadow my-4 w-44`} id="dropdownNavbar">
                                        <ul className="py-1" aria-labelledby="dropdownLargeButton">
                                            <li>
                                                <Link to={'dashboard'}  className="text-sm hover:bg-gray-100 text-gray-700 block px-4 pr-4  py-2">Dashboard</Link>
                                            </li>

                                        </ul>
                                        <div onClick={handleLogout} className="py-1">
                                            <a  className="text-sm hover:bg-gray-100 text-gray-700 block px-4 pr-4 py-2">Sign out</a>
                                        </div>
                                    </div>
                                </li> : <> <Link to={'/login'} className='px-8 py-6 rounded-lg text-white text-sm tracking-wider  border border-current outline-none bg-gradient-to-tr hover:bg-gradient-to-tl from-green-700 to-green-300 font-bold'>logIn</Link></>}
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </Container>
    );
};

export default Navbar;
