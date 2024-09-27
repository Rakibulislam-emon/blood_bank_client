import { Link } from 'react-router-dom';
import logo from '../../../assets/images/doctor-nurses-special-equipment.jpg';
import './Banner.css';

const Banner = () => {
  return (
    <section className="bg_image bg-white dark:bg-gray-900">
      <div className="grid max-w-screen-xl px-4 mt-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28">
        {/* Left side content */}
        <div className="mr-auto place-self-center lg:col-span-7 text-center lg:text-left">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white">
            Life Source <span className="text-[#E40C13]">Blood</span> Bank
          </h1>

          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            LifeSource Blood Bank connects donors with those in need, ensuring a steady supply of life-saving blood donations. Join us in saving lives today.
          </p>

          <div className="space-y-4 space-x-2 sm:space-y-0 sm:flex sm:space-x-4 justify-center lg:justify-start">
            <Link to="/register" className="btn bg-white">
              JOIN AS A DONOR
            </Link>
            <Link to="/search-donor" className="btn bg-white">
              Search Donor
            </Link>
          </div>
        </div>

        {/* Right side image */}
        <div className="mt-8 lg:mt-0 lg:col-span-5 flex justify-center lg:flex">
          <img className="rounded-lg max-w-full h-auto" src={logo} alt="hero image" />
        </div>
      </div>
    </section>
  );
};

export default Banner;
