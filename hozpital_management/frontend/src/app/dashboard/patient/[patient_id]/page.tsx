'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '@/app/utils/axios';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table as UITable } from '@/components/ui/table';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout';

interface MedicalRecord {
  record_id: number;
  description: string;
  date: string;
}

interface Patient {
  patient_id: number;
  first_name: string;
  last_name: string;
  email: string;
  MedicalRecords: MedicalRecord[];
}

const PatientDetail = () => {
  const { patient_id } = useParams();
  const router = useRouter();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    if (patient_id) {
      api
        .get(`/patients/${patient_id}`)
        .then((response) => {
          console.log("Fetched Patient Data:", response.data); 
          setPatient(response.data as Patient); 
        })
        .catch((error) => console.error("Error fetching patient details:", error));
    }
  }, [patient_id]);

  const table = useReactTable({
    data: patient?.MedicalRecords || [], 
    columns: [
      {
        header: 'Record ID',
        cell: ({ row }: { row: any }) => {
          const medicalRecord = row.original;
          const recordId = medicalRecord?.record_id || 'No Record ID';
          return recordId;
        },
      },
      {
        header: 'Description',
        cell: ({ row }: { row: any }) => {
          const medicalRecord = row.original;
          const description = medicalRecord?.description || 'No Description';
          return description;
        },
      },
      {
        header: 'Patient Name',
        cell: () => {
          const firstName = patient?.first_name || 'Unknown';
          const lastName = patient?.last_name || 'Patient';
          return `${firstName} ${lastName}`;
        },
      },
    ],
    getCoreRowModel: getCoreRowModel(),
  });
  
  
  

  if (!patient) return <div>Loading...</div>;

  return (
    <Layout>
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-blue-100 to-blue-200 shadow-md rounded-lg p-6 mb-6"
      >
        <h1 className="text-3xl font-bold text-blue-800 mb-4">Patient Details</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-semibold">First Name:</span>
            <span>{patient.first_name}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-semibold">Last Name:</span>
            <span>{patient.last_name}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-semibold">Email:</span>
            <span>{patient.email}</span>
          </div>
        </div>
      </motion.div>

      <h2 className="text-xl font-semibold text-gray-700 mt-8">Medical Records</h2>

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
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </UITable>
      </motion.div>

      <Button onClick={() => router.back()} className="mt-8 bg-blue-900 text-white hover:bg-blue-700">
        Back
      </Button>
    </div>
    </Layout>
  );
};

export default PatientDetail;
