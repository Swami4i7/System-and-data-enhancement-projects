'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { HomeIcon, UserIcon, BriefcaseIcon, CalendarIcon, Cog6ToothIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
// Sidebar open/closed state variants with smoother easing and longer duration
const sidebarVariants = {
  open: {
    width: 240,
    transition: { duration: 0.4, ease: [0.35, 0.8, 0.5, 1] },
  },
  closed: {
    width: 75,
    transition: { duration: 0.3, ease: [0.25, 0.8, 0.5, 3] },
  },
};

// Logo-to-Firm Name transition with smoother animation
const logoVariants = {
  open: {
    opacity: 1,
    x: 0,
    transition: { delay: 0.4, duration: 0.4, ease: 'easeOut' },
  },
  closed: {
    opacity: 0,
    x: -20,
    transition: { duration: 0.4, ease: 'easeIn' },
  },
};

// Text animation for menu items with fine-tuned delays
const textVariants = {
  hidden: {
    opacity: 0,
    x: -10,
    transition: { duration: 0.4, ease: 'easeIn' },
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: { delay: 0.4, duration: 0.5, ease: 'easeOut' },
  },
};

interface SidebarProps {
  onToggle: (isOpen: boolean) => void;
  onAnimationComplete: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onToggle, onAnimationComplete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFirmNameAnimationComplete, setIsFirmNameAnimationComplete] = useState(false);
  const [isSidebarAnimationComplete, setIsSidebarAnimationComplete] = useState(false);
  const [isBlurred, setIsBlurred] = useState(false);

  // Toggle sidebar and blur effect on content
  const handleSidebarClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).tagName !== 'IMG') {
      setIsOpen(!isOpen);
      setIsSidebarAnimationComplete(false); // Reset sidebar animation state when toggling
      setIsFirmNameAnimationComplete(false); // Reset firm name animation state
    }
  };

  useEffect(() => {
    if (isOpen) {
      setIsBlurred(true); // Start blurring when sidebar is opened
    }
    onToggle(isOpen);
  }, [isOpen, onToggle]);

  // Handle firm name animation complete
  const handleFirmNameAnimationComplete = () => {
    setIsFirmNameAnimationComplete(true); // Trigger after firm name animation completes
    if (!isOpen && isSidebarAnimationComplete) {
      setIsBlurred(false); // Remove blur only after both animations complete and sidebar is closed
    }
  };

  // Handle sidebar animation complete
  const handleSidebarAnimationComplete = () => {
    if (!isOpen && isFirmNameAnimationComplete) {
      setIsBlurred(false); // Remove blur after both firm name and sidebar animations complete
    }
    onAnimationComplete();
    setIsSidebarAnimationComplete(true);
  };

  return (
    <>
      {/* Sidebar */}
      <motion.aside
        className="min-h-full bg-[#4A628A] text-white fixed z-30 flex flex-col justify-between "
        variants={sidebarVariants}
        animate={isOpen ? 'open' : 'closed'}
        onAnimationComplete={handleSidebarAnimationComplete}
        onClick={handleSidebarClick}
      >
        {/* Top Section - Logo and Menu */}
        <div>
          {/* Logo and Firm Name */}
          <motion.div
            className={`flex items-center space-x-2 py-2 px-4 relative ${isOpen ? 'cursor-pointer' : ''} group`}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            {
              !isOpen && (<Link href="/dashboard"> 
              <div className='logo-container'><Image src="/images/logo.jpg" alt="Logo" className="h-10 w-10 logo" width={20} height={20} /></div>
            </Link>)
            }
            {isOpen && (
              <motion.span
                className="relative text"
                variants={textVariants}
                initial="hidden"
                animate={isOpen ? 'visible' : 'hidden'}
              >
              <div className="flex items-center justify-between space-x-2 p-4">
              <Link href="/dashboard">
                <Image src="/images/logo.jpg" alt="Logo" className="h-10 w-10" width={100} height={100} />
              </Link>
              <motion.span
              className="font-bold text-lg"
              variants={logoVariants}
              initial="closed"
              animate={isOpen ? 'open' : 'closed'}
              onAnimationComplete={handleFirmNameAnimationComplete} // Track the firm name animation
              >
              FirmName
              </motion.span>
              <motion.span
              className="font-bold text-lg"
              variants={logoVariants}
              initial="closed"
              animate={isOpen ? 'open' : 'closed'}
              onAnimationComplete={handleFirmNameAnimationComplete} // Track the firm name animation
              >
              {isOpen && (
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                <ChevronLeftIcon className="h-6 w-6 text-white" />
              </motion.div>
            )}
              </motion.span>
                {/* Underline Animation */}
                {/* <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-white transition-all duration-300 ease-in-out group-hover:w-full"></span> */}
                </div>
              </motion.span>
            )}
          </motion.div>
          
        </div>
          {/* Menu Items */}
          <ul className="mb-20 space-y-2">
            <li onClick={() => window.location.href = '/dashboard/doctor'}>
              <motion.div
                className={`flex items-center space-x-2 py-2 px-4 relative ${isOpen ? 'cursor-pointer' : ''} group`}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <HomeIcon className="h-6 w-6" />
                {isOpen && (
                  <motion.span
                    className="relative text"
                    variants={textVariants}
                    initial="hidden"
                    animate={isOpen ? 'visible' : 'hidden'}
                  >
                    Doctor
                    {/* Underline Animation */}
                    <span className="absolute left-0 bottom-0 h-[1.5px] w-0 bg-white transition-all duration-300 ease-in-out group-hover:w-full"></span>
                  </motion.span>
                )}
              </motion.div>
            </li>
            <li onClick={() => window.location.href = '/dashboard/patient'}>
              <motion.div
                className={`flex items-center space-x-2 py-2 px-4 relative ${isOpen ? 'cursor-pointer' : ''} group`}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <UserIcon className="h-6 w-6" />
                {isOpen && (
                  <motion.span
                    className="relative text"
                    variants={textVariants}
                    initial="hidden"
                    animate={isOpen ? 'visible' : 'hidden'}
                  >
                    Patient
                    {/* Underline Animation */}
                    <span className="absolute left-0 bottom-0 h-[1.5px] w-0 bg-white transition-all duration-300 ease-in-out group-hover:w-full"></span>
                  </motion.span>
                )}
              </motion.div>
            </li>
            <li onClick={() => window.location.href = '/dashboard/department'}>
              <motion.div
                className={`flex items-center space-x-2 py-2 px-4 relative ${isOpen ? 'cursor-pointer' : ''} group`}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <BriefcaseIcon className="h-6 w-6" />
                {isOpen && (
                  <motion.span
                    className="relative text"
                    variants={textVariants}
                    initial="hidden"
                    animate={isOpen ? 'visible' : 'hidden'}
                  >
                    Department
                    {/* Underline Animation */}
                    <span className="absolute left-0 bottom-0 h-[1.5px] w-0 bg-white transition-all duration-300 ease-in-out group-hover:w-full"></span>
                  </motion.span>
                )}
              </motion.div>
            </li>
            <li onClick={() => window.location.href = '/dashboard/appointment'}>
              <motion.div
                className={`flex items-center space-x-2 py-2 px-4 relative ${isOpen ? 'cursor-pointer' : ''} group`}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <CalendarIcon className="h-6 w-6" />
                {isOpen && (
                  <motion.span
                    className="relative text"
                    variants={textVariants}
                    initial="hidden"
                    animate={isOpen ? 'visible' : 'hidden'}
                  >
                    Appointment
                    {/* Underline Animation */}
                    <span className="absolute left-0 bottom-0 h-[1.5px] w-0 bg-white transition-all duration-300 ease-in-out group-hover:w-full"></span>
                  </motion.span>
                )}
              </motion.div>
            </li>
          </ul>
        {/* Bottom Section - Settings */}
        <div className="pb-4 mt-">
          <motion.div
            className={`flex space-x-2 py-2 px-4 relative ${isOpen ? 'cursor-pointer' : ''} group`}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Cog6ToothIcon className="h-6 w-6" />
            {isOpen && (
              <motion.span
                className="relative text"
                variants={textVariants}
                initial="hidden"
                animate={isOpen ? 'visible' : 'hidden'}
              >
                Settings
                {/* Underline Animation */}
                {/* <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-white transition-all duration-300 ease-in-out group-hover:w-full"></span> */}
              </motion.span>
            )}
          </motion.div>
        </div>
      </motion.aside>

      {/* Blur effect on the rest of the page */}
      <motion.div
        className={`transition-all duration-300 ${isBlurred ? 'blur-md' : ''}`}
      >
        {/* Rest of your page content */}
      </motion.div>
    </>
  );
};

export default Sidebar;
