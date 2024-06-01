import { NavLink } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Navitems = ({title , path}) => {
    return (
        <NavLink
      to={path}
      end 
      className={({ isActive }) =>
        `flex items-center px-2 py-2 my-5 rounded-xl transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
          isActive ? 'bg-gray-300  text-red-700' : 'text-black-600'
        }`
      }
    >

      <span className='mx-4 font-medium'>{title}</span>
    </NavLink>
    );
};

export default Navitems;