'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '@/app/utils/axios';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table as UITable } from '@/components/ui/table';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout';
import { getCookie } from 'cookies-next';
import { format } from 'date-fns';

interface Appointment {
  appointment_id: number;
  appointment_date: string;
  status: string;
  doctor_id: number;
  patient_id: number;
}

interface Department {
  department_name: string;
}

interface Doctor {
  doctor_id: number;
  first_name: string;
  last_name: string;
  email: string;
  Department: Department | null;
  Appointments: Appointment[];
}

const DoctorDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const doctorId = params?.doctor_id;
  const [doctor, setDoctor] = useState<Doctor | null>(null);

  useEffect(() => {
    if (doctorId) {
      const token = getCookie('authToken');
      api
        .get(`/doctors/${doctorId}`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        })
        .then((response) => {
          console.log("Fetched Doctor Data:", response.data);
          setDoctor(response.data as Doctor);
        })
        .catch((error) => {
          console.error("Error fetching doctor details:", error);
          setDoctor(null);
        });
    }
  }, [doctorId]);

  const table = useReactTable({
    data: doctor?.Appointments || [],
    columns: [
      {
        header: 'Appointment ID',
        cell: ({ row }: { row: any }) => {
          const appointment_id = row.original?.appointment_id || row.original?.id || row.original?.ID;
          return appointment_id || 'No Appointment ID available';
        },
      },
          
      {
        header: 'Date',
        cell: ({ row }: { row: any }) => {
          const date = row.original?.appointment_date || row.original?.AppointmentDate || row.original?.date;
          return date ? format(new Date(date), 'MMMM dd, yyyy') : 'No Date Available';
        },
      },
      {
        header: 'Status',
        cell: ({ row }: { row: any }) => {
          const status = row.original?.status || row.original?.Status || row.original?.appointment_status;
          return status || 'No Status Available';
        },
      },
      {
        header: 'Doctor ID',
        cell: ({ row }: { row: any }) => {
          const doctorId = row.original?.doctor_id || row.original?.DoctorID || row.original?.doctorID;
          return doctorId || 'No Doctor ID';
        },
      },
      {
        header: 'Patient ID',
        cell: ({ row }: { row: any }) => {
          const patientId = row.original?.patient_id || row.original?.PatientID || row.original?.patientID;
          return patientId || 'No Patient ID';
        },
      },
    ],
    getCoreRowModel: getCoreRowModel(),
  });
  
  

  return (
    <Layout>
      <div className="p-6">
        {doctor ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-blue-100 to-blue-200 shadow-md rounded-lg p-6 mb-6"
            >
              <h1 className="text-3xl font-bold text-blue-800 mb-4">Doctor Details</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">First Name:</span>
                  <span>{doctor.first_name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">Last Name:</span>
                  <span>{doctor.last_name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">Email:</span>
                  <span>{doctor.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">Department:</span>
                  <span>{doctor.Department?.department_name || 'No Department Assigned'}</span>
                </div>
              </div>
            </motion.div>

            <h2 className="text-xl font-semibold text-gray-700 mt-8">Appointments</h2>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full bg-white shadow-md rounded-lg p-6 mt-4"
            >
              <UITable>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead key={header.id}>
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </UITable>
            </motion.div>

            <Button onClick={() => router.back()} className="mt-8 bg-blue-900 text-white hover:bg-blue-700">
              Back
            </Button>
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </Layout>
  );
};

export default DoctorDetailPage;
