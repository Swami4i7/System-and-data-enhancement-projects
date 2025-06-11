// src/routes.tsx
import React from 'react';
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';


const Doctor = lazy(() => import('./app/dashboard/doctor/page'));
const Patient = lazy(() => import('./app/dashboard/patient/page'));
const Department = lazy(() => import('./app/dashboard/department/page'));
const Appointment = lazy(() => import('./app/dashboard/appointment/page'));

export const routes: RouteObject[] = [
  { path: '/doctor', element: <Doctor /> },
  { path: '/patient', element: <Patient /> },
  { path: '/department', element: <Department /> },
  { path: '/appointment', element: <Appointment /> },
];
