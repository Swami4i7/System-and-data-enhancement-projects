'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MagnifyingGlassIcon, BellIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import Breadcrumb from './breadcrumb';
import Image from 'next/image';
import {useSearchContext} from '../contexts/searchcontext'
import { debounce } from '@/utils/debounce';

// Navbar animation variants based on sidebar state
const navbarVariants = (duration: number, ease: any) => ({
  open: {
    paddingLeft: 250, // Sidebar open
    transition: { duration, ease },
  },
  closed: {
    paddingLeft: 40, // Sidebar closed
    paddingRight: 20,
    transition: { duration, ease },
  },
});

// Search bar expansion animation (expands symmetrically from the center)
const searchBarVariants = {
  collapsed: {
    width: '200px', // Initial width when not focused
    transition: { duration: 0.4, ease: [0.25, 0.8, 0.5, 1] },
  },
  expanded: {
    width: '400px', // Expanded width
    transition: { duration: 0.4, ease: [0.25, 0.8, 0.5, 1] },
  },
};

// Simplified avatar dropdown animation variants
const dropdownVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  transition: (duration: number) => ({
    duration,
    ease: 'easeOut',
  }),
};

interface NavbarProps {
  isSidebarOpen: boolean;
  animationSettings?: {
    duration?: number;
    ease?: any;
    delay?: number;
  };
}

const Navbar: React.FC<NavbarProps> = ({
  isSidebarOpen,
  animationSettings = { duration: 0.4, ease: [0.25, 0.8, 0.5, 1] }, // Default settings if not provided
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false); // State to track if the search bar is expanded
  const dropdownRef = useRef<HTMLDivElement>(null); // Reference for dropdown
  const { searchTerm, setSearchTerm } = useSearchContext();
  const [inputValue, setInputValue] = useState('');
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const debouncedSetSearchTerm = debounce((value: string) => {
    setSearchTerm(value);
  }, 300);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);  // Update local state
    debouncedSetSearchTerm(value);  // Update context with debounce
  };

  // Close dropdown on clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false); // Close dropdown if clicked outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <motion.nav
      className="bg-[#DFF2EB] text-gray-800 h-16 flex items-center rounded-xl relative top-0 w-full shadow-md z-10"
      variants={navbarVariants(animationSettings.duration!, animationSettings.ease!)}
      animate={isSidebarOpen ? 'open' : 'closed'}
    >
      <div className="flex justify-between items-center w-full">
        {/* Breadcrumb Component */}
        <Breadcrumb />
      
      {/* Center: Search Bar */}
      <motion.div
        className="relative flex-grow flex justify-center items-center mr-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: animationSettings.duration,
          ease: animationSettings.ease,
        }}
      >
        <motion.input
          type="text"
          className="py-2 pl-10 pr-4 rounded-full bg-white shadow-md transition focus:outline-none focus:ring-2 focus:ring-[#7AB2D3] focus:border-[#7AB2D3]"
          placeholder="Search..."
          variants={searchBarVariants}
          animate={isSearchExpanded ? 'expanded' : 'collapsed'}
          onFocus={() => setIsSearchExpanded(true)}  // Expand on focus
          onBlur={() => setIsSearchExpanded(false)}  // Collapse on blur
          onChange={(e)=> setSearchTerm(e.target.value)}
        />
      </motion.div>

      {/* Right: Notification Icon and Avatar */}
      <div className="flex items-center mr-4 space-x-6">
        {/* Notification Icon */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="relative cursor-pointer hover:text-[#7AB2D3]"
        >
          <BellIcon className="h-6 w-6 text-gray-600" />
          {/* Optional Badge */}
          <span className="absolute top-0 right-0 block h-2 w-2 bg-red-600 rounded-full"></span>
        </motion.div>

        {/* Avatar with Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 cursor-pointer"
            onClick={toggleDropdown}
          >
            <Image
              src='/images/avatar.jpg'
              alt="Avatar"
              className="h-8 w-8 rounded-full"
              width={100}
              height={100}
            />
            {/* <ChevronDownIcon className="h-5 w-5 text-gray-600" /> */}
          </motion.div>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={dropdownVariants}
              transition={dropdownVariants.transition(animationSettings.duration!)}
              className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-20"
            >
              <a
                href="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#7AB2D3] hover:text-white"
              >
                Profile
              </a>
              <a
                href="/settings"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#7AB2D3] hover:text-white"
              >
                Settings
              </a>
              <a
                href="/login"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#7AB2D3] hover:text-white"
              >
                Logout
              </a>
            </motion.div>
          )}
        </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
