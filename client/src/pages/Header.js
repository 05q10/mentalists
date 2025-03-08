import React, { useState } from "react";
import {
  Menu,
  Search,
  ChevronDown,
  User,
  Settings,
  LogOut,
  X,
} from "lucide-react";
import img1 from "../img/logo.png";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-purple-700 via-purple-500 to-indigo-500 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6">
        {/* Left Section: Logo & Website Name */}
        <div className="flex items-center space-x-3">
          <img src={img1} alt="Logo" className="w-14 h-14" />
          <h1 className="text-2xl font-bold">GigWiz</h1>
        </div>

        {/* <nav className="hidden md:flex space-x-6">
          <a href="/" className="hover:text-gray-200 transition">Home</a>
          <a href="/community" className="hover:text-gray-200 transition">Community</a>
          <a href="/finance" className="hover:text-gray-200 transition">Finance</a>
          <a href="/opportunities" className="hover:text-gray-200 transition">Opportunities</a>
        </nav> */}

        {/*        
        <div className="hidden md:flex bg-white text-gray-900 rounded-lg px-3 py-2">
          <Search className="w-5 h-5 text-gray-500" />
          <input type="text" placeholder="Search gigs..." className="border-none focus:ring-0 outline-none px-2 bg-transparent" />
        </div> */}

        {/* Right Section: Buttons & User Dropdown */}
        <div className="flex items-center space-x-4">
          <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition">
            Contact Us
          </button>
          <button className="bg-purple-700 px-4 py-2 rounded-lg font-medium hover:bg-purple-800 transition">
            Join Us
          </button>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-2"
            >
              <User className="w-6 h-6" />
              <ChevronDown className="w-5 h-5" />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-gray-900 shadow-lg rounded-lg p-2">
                <a
                  href="/profile"
                  className="flex items-center px-3 py-2 hover:bg-gray-100 rounded-md"
                >
                  <User className="w-5 h-5 mr-2" /> Profile
                </a>
                <a
                  href="/settings"
                  className="flex items-center px-3 py-2 hover:bg-gray-100 rounded-md"
                >
                  <Settings className="w-5 h-5 mr-2" /> Settings
                </a>
                <button className="w-full text-left flex items-center px-3 py-2 hover:bg-gray-100 rounded-md">
                  <LogOut className="w-5 h-5 mr-2" /> Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden block"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* {mobileMenuOpen && (
        <div className="md:hidden bg-purple-700 p-4 flex flex-col space-y-4 text-center">
          <a href="/" className="hover:text-gray-200 transition">Home</a>
          <a href="/community" className="hover:text-gray-200 transition">Community</a>
          <a href="/finance" className="hover:text-gray-200 transition">Finance</a>
          <a href="/opportunities" className="hover:text-gray-200 transition">Opportunities</a>
          <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition">
            Contact Us
          </button>
          <button className="bg-purple-700 px-4 py-2 rounded-lg font-medium hover:bg-purple-800 transition">
            Join Us
          </button>
        </div>
      )} */}
    </header>
  );
};

export default Header;
