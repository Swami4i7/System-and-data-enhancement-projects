'use client';

import React, { useState } from 'react';
import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';
import { motion } from 'framer-motion';
import { DynamicRoute } from './dynamic-route';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = (isOpen: boolean) => {
    setIsSidebarOpen(isOpen);
  };

  return (
    <div className="flex h-screen relative mr-1">
      {/* Sidebar */}
      <Sidebar onToggle={handleSidebarToggle} onAnimationComplete={() => {}} />

      {/* Main Content */}
      <motion.div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? 'pl-64' : 'pl-20'
        } ${isSidebarOpen ? 'blur-md' : ''}`} // Add blur when sidebar is open
        animate={{
          filter: isSidebarOpen ? 'blur(4px)' : 'blur(0px)', // Add blur effect based on sidebar state
          transition: { duration: 0.3 },
        }}
      >
        {/* Navbar */}
        <Navbar isSidebarOpen={isSidebarOpen} />

        {/* Main Page Content */}
        <main className="flex-1 p-6 bg-[#DFF2EB]">
        {DynamicRoute()}
          {children}
        </main>
      </motion.div>

      {/* Optional backdrop behind the sidebar */}
      {isSidebarOpen && (
        <motion.div
          className="fixed inset-0 bg-black opacity-50 z-10" // Dark background when sidebar is open
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsSidebarOpen(false)} // Clicking outside the sidebar closes it
        ></motion.div>
      )}
    </div>
  );
};

export default Layout;
