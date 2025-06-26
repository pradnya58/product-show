import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../context/UserContext';
import avatar from '/avatar.png';
import Switcher from './Switcher';

export default function Header() {
  const [showLinks, setShowLinks] = useState(false);
  const { isLoggedIn } = useContext(userContext);

  return (
    <div className="bg-pink-50 border-b border-gray-100 flex flex-col lg:flex-row lg:justify-between transition-all duration-300">
      <div className="flex justify-between items-center px-4 py-2 lg:py-0">
        <img
          src="/images/logo.png"
          alt="logo"
          className="h-[71px] w-auto lg:h-[110px]"
        />

        {/* Hamburger Icon */}
        <button
          onClick={() => setShowLinks(!showLinks)}
          className="lg:hidden focus:outline-none text-pink-700 dark:text-pink-300"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {showLinks ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Navigation Links */}
      <ul className={`lg:flex lg:flex-row items-center font-bold text-lg ${showLinks ? 'block' : 'hidden'} lg:justify-center w-full pl-6`}>
        <li className="mb-2 lg:mb-0 lg:mr-4">
          <Link to='/' className="text-pink-700 dark:text-pink-400 hover:text-pink-900">Home</Link>
        </li>
        <li className="mb-2 lg:mb-0 lg:mr-4">
          <Link to='/cart' className="text-pink-700 dark:text-pink-400 hover:text-pink-900">Cart</Link>
        </li>
        <li className="mb-2 lg:mb-0 lg:mr-4">
          <Link to='/wishlist' className="text-pink-700 dark:text-pink-400 hover:text-pink-900">Wishlist</Link>
        </li>
        {(isLoggedIn === 'false' || !isLoggedIn || isLoggedIn == null || isLoggedIn === 'null') ? (
          <li>
            <Link to='/login' className="text-pink-700 dark:text-pink-400 hover:text-pink-900">Login</Link>
          </li>
        ) : (
          <li>
            <Link to='/profile' className="text-pink-700 dark:text-pink-400 hover:text-pink-900 flex items-center gap-2">
              <img src={avatar} alt="profile" className="rounded-full w-8 h-8 lg:block hidden" />
              <span className="lg:hidden">Profile</span>
            </Link>
          </li>
        )}

        {/* Theme Switcher */}
        <li className="flex items-center mx-5 my-3 lg:ml-auto">
          <Switcher />
        </li>
      </ul>
    </div>
  );
}
