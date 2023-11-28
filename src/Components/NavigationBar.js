import React from 'react';
import { Link } from 'react-router-dom';

function NavigationBar() {

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <ul>
            <li>
              <Link
                to="/login"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                {' '}
                Login{' '}
              </Link>{' '}
            </li>
            <li>
              <Link
                to="/signup"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                {' '}
                Sign UP{' '}
              </Link>{' '}
            </li>
          </ul>
      </div>
    </nav>
  );
}

export default NavigationBar;
