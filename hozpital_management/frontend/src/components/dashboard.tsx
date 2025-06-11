'use client';

import React, { useEffect, useState } from 'react';
import Sidebar from './sidebar'; 
import Navbar from './navbar';   
import { DashboardContent } from './dynamic-route'
import DoctorDetails from './doctor-details';
import UpcomingAppointments from './upcoming-appointments';
import ScheduledMeetings from './calendar';
import Separator from './separator';
import RecentAnnouncements from './announcement';
import DepartmentOverview from './department';
import PatientReviews from './patient-reviews';
import Recruitments from './recruitment';
import { motion } from 'framer-motion';
import { checkAuth, useAuthCheck } from '@/utils/auth';
import { useRouter } from 'next/navigation';

const DashboardLayout = () => {

  // const router= useRouter();
  // useEffect(() => {
  //   if (!checkAuth()) {
  //     router.push('/login'); 
  //   }
  // }, [router]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarAnimationComplete, setSidebarAnimationComplete] = useState(false);

  const handleSidebarToggle = (isOpen: boolean) => {
    setIsSidebarOpen(isOpen);
  };

  const handleSidebarAnimationComplete = () => {
    setSidebarAnimationComplete(isSidebarOpen);
  };

  

  return (
    <div className="flex ">
      {/* Sidebar */}
      <Sidebar 
        onToggle={handleSidebarToggle} 
        onAnimationComplete={handleSidebarAnimationComplete}
      />

      {/* Main content section */}
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
        <div>
        <Navbar isSidebarOpen={isSidebarOpen} />
        </div>
        {/* Dynamic content below the Navbar */}
        <main className="p-1 bg-[#DFF2EB] min-h-full rounded-xl">
        <DashboardContent />
        <div className="p-6 space-y-6">
      {/* Top Section: Doctor Details and Upcoming Appointments */}
      <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
        <DoctorDetails />
        <UpcomingAppointments />
      </div>

      {/* Middle Section: Scheduled Meetings and Recent Announcements */}
      <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
        <ScheduledMeetings />
        <RecentAnnouncements />
      </div>

      {/* Separator */}
      <Separator />

      {/* Department Overview */}
      <DepartmentOverview />

      {/* Bottom Section: Patient Reviews and Recruitments */}
      <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
        <PatientReviews />
        <Recruitments />
      </div>
    </div>
    </main>
    </motion.div>
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

export default DashboardLayout;
