'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

const DoctorPage = ({ id }: { id: string }) => <div>Doctor Page for ID: {id}</div>;
const PatientPage = ({ id }: { id: string }) => <div>Patient Page for ID: {id}</div>;
const DepartmentPage = ({ id }: { id: string }) => <div>Department Page for ID: {id}</div>;
const AppointmentPage = ({ id }: { id: string }) => <div>Appointment Page for ID: {id}</div>;

export const DynamicRoute = () => {
  const pathname = usePathname();

  const routeSegments = pathname.split('/').filter(Boolean); 
  const mainRoute = routeSegments[0];
  const routeId = routeSegments[1] || null;

  switch (mainRoute) {
    case 'doctor':
      return routeId ? <DoctorPage id={routeId} /> : <div>All Doctors Page</div>;
    case 'patient':
      return routeId ? <PatientPage id={routeId} /> : <div>All Patients Page</div>;
    case 'department':
      return routeId ? <DepartmentPage id={routeId} /> : <div>All Departments Page</div>;
    case 'appointment':
      return routeId ? <AppointmentPage id={routeId} /> : <div>All Appointments Page</div>;
    default:
      return <div>Dashboard</div>;
  }
};

export function DashboardContent() {
  return (
    <div className="overflow-auto ml-6 mt-1 font-bold text-lg">
      <DynamicRoute />
    </div>
  );
}
