import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext, { ThemeContext } from "../utils/UserContext";
import { useSelector } from "react-redux";

const Header = () => {
  const [btnNameReact, setBtnNameReact] = useState("Login");
  const onlineStatus = useOnlineStatus();
  const { loggedInUser } = useContext(UserContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const cartItems = useSelector((store) => store.cart.items);

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-dark-800 shadow-sm border-b border-dark-100 dark:border-dark-700 dark:border-dark-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl font-bold">🍔</span>
            </div>
            <span className="text-2xl font-bold text-dark-900 dark:text-white">FoodHub</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-dark-700 dark:text-dark-200 dark:text-dark-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="text-dark-700 dark:text-dark-200 dark:text-dark-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="text-dark-700 dark:text-dark-200 dark:text-dark-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
            >
              Contact
            </Link>
            <Link 
              to="/grocery" 
              className="text-dark-700 dark:text-dark-200 dark:text-dark-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
            >
              Grocery
            </Link>
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Online Status */}
            <div className="hidden sm:flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${onlineStatus ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-sm text-dark-600 dark:text-dark-300 dark:text-dark-400">{onlineStatus ? 'Online' : 'Offline'}</span>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-dark-100 dark:bg-dark-800 dark:hover:bg-dark-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {theme === "light" ? (
                <svg className="w-5 h-5 text-dark-700 dark:text-dark-200 dark:text-dark-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-dark-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </button>

            {/* Cart */}
            <Link 
              to="/cart" 
              className="relative flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-dark-50 dark:bg-dark-700 dark:hover:bg-dark-700 transition-colors"
            >
              <svg className="w-6 h-6 text-dark-700 dark:text-dark-200 dark:text-dark-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* User */}
            <div className="hidden lg:flex items-center space-x-3 px-4 py-2 bg-dark-50 dark:bg-dark-700 dark:bg-dark-700 rounded-lg">
              <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-primary-600 dark:text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-sm font-medium text-dark-700 dark:text-dark-200 dark:text-dark-300">{loggedInUser}</span>
            </div>

            {/* Login/Logout Button */}
            <button
              onClick={() => {
                setBtnNameReact(btnNameReact === "Login" ? "Logout" : "Login");
              }}
              className="btn-primary"
            >
              {btnNameReact}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
