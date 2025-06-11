'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '@/app/utils/axios';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table as UITable } from '@/components/ui/table';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout';

interface Doctor {
  doctor_id: number;
  first_name: string;
  last_name: string;
  email: string;
}

interface Department {
  department_id: number;
  department_name: string;
  location: string;
  Doctors: Doctor[];
}

const DepartmentDetail = () => {
  const router = useRouter();
  const params = useParams();
  const departmentId = params?.department_id;
  const [department, setDepartment] = useState<Department | null>(null);

  useEffect(() => {
    if (departmentId) {
      api
        .get(`/departments/${departmentId}`)
        .then((response) => {
          console.log("Fetched Department Data:", response.data); 
          setDepartment(response.data as Department);
        })
        .catch((error) => console.error("Error fetching department details:", error));
    }
  }, [departmentId]);


  const table = useReactTable({
    data: department?.Doctors || [], 
    columns: [
      { header: 'Doctor ID', accessorKey: 'doctor_id' },
      { header: 'First Name', accessorKey: 'first_name' },
      { header: 'Last Name', accessorKey: 'last_name' },
      { header: 'Email', accessorKey: 'email' },
    ],
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Layout>
    <div className="p-6">
      {department ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-blue-100 to-blue-200 shadow-md rounded-lg p-6 mb-6"
          >
            <h1 className="text-3xl font-bold text-blue-800 mb-4">Department Details</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <span className="font-semibold">Department Name:</span>
                <span>{department.department_name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold">Location:</span>
                <span>{department.location}</span>
              </div>
            </div>
          </motion.div>

          <h2 className="text-xl font-semibold text-gray-700 mt-8">Doctors in this Department</h2>
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

          <Button onClick={() => router.back()} className="mt-8 bg-blue-900 text-white hover:bg-green-700">
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

export default DepartmentDetail;
