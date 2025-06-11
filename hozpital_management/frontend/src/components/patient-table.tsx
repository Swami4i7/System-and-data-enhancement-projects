import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table as UITable } from '@/components/ui/table';
import { motion } from 'framer-motion';

interface Patient {
  patient_id: number;
  first_name: string;
  last_name: string;
  email: string;
  Doctor?: {
    first_name?: string;
    last_name?: string;
  };
}

interface PatientTableProps {
  patients: Patient[];
  onDelete: (patient: Patient) => void;
  onEdit: (patient: Patient) => void;
}

const PatientTable: React.FC<PatientTableProps> = ({ patients, onDelete, onEdit }) => {
  const router = useRouter();
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const paginatedPatients = useMemo(() => {
    const start = pageIndex * pageSize;
    return patients.slice(start, start + pageSize);
  }, [patients, pageIndex, pageSize]);

  const totalPages = Math.ceil(patients.length / pageSize);

  const handleView = (patient_id: number) => {
    router.push(`/dashboard/patient/${patient_id}`);
  };

  const table = useReactTable({
    data: paginatedPatients,
    columns: [
      { header: 'Patient ID', accessorKey: 'patient_id' },
      { header: 'First Name', accessorKey: 'first_name' },
      { header: 'Last Name', accessorKey: 'last_name' },
      { header: 'Email', accessorKey: 'email' },
      {
        header: 'Doctor Name',
        cell: ({ row }: { row: any }) => {
          const Doctor = row.original?.Doctor || {};
          const doctorName = Doctor?.first_name && Doctor?.last_name 
            ? `${Doctor.first_name} ${Doctor.last_name}` 
            : 'No Doctor Assigned';
          return doctorName;
        },
      },
      {
        header: 'Actions',
        cell: ({ row }: { row: any }) => (
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => handleView(row.original.patient_id)}>
              View
            </Button>
            <Button onClick={() => onEdit(row.original)} className="bg-blue-900 text-white">
              Edit
            </Button>
            <Button variant="destructive" onClick={() => onDelete(row.original)}>
              Delete
            </Button>
          </div>
        ),
      },
    ],
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-white shadow-md rounded-lg p-6"
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

      {/* Pagination Controls */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center space-x-2">
          <Button
            onClick={() => setPageIndex((prev) => Math.max(prev - 1, 0))}
            disabled={pageIndex === 0}
            className="bg-gray-200 text-gray-700"
          >
            Previous
          </Button>
          <span className="text-gray-700">
            Page {pageIndex + 1} of {totalPages}
          </span>
          <Button
            onClick={() => setPageIndex((prev) => Math.min(prev + 1, totalPages - 1))}
            disabled={pageIndex >= totalPages - 1}
            className="bg-gray-200 text-gray-700"
          >
            Next
          </Button>
        </div>

        {/* Page size selector */}
        <div className="flex items-center space-x-2">
          <label htmlFor="pageSize" className="text-gray-700">
            Rows per page:
          </label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPageIndex(0); 
            }}
            className="bg-white border-gray-300 rounded-md"
          >
            {[5, 10, 20].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>
    </motion.div>
  );
};

export default PatientTable;
