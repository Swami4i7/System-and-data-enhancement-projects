import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table as UITable } from '@/components/ui/table';
import { motion } from 'framer-motion';

interface Department {
  department_name?: string;
}

interface Doctor {
  doctor_id: number;
  first_name: string;
  last_name: string;
  email: string;
  Department?: Department;
}

interface DoctorTableProps {
  doctors: Doctor[];
  searchTerm: string;
  onDelete: (doctor: Doctor) => void;
  onEdit: (doctor: Doctor) => void;
}

const DoctorTable: React.FC<DoctorTableProps> = ({ doctors, searchTerm = '', onDelete, onEdit }) => {
  const router = useRouter();
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  // Filter doctors based on the search term
  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) =>
      `${doctor.first_name} ${doctor.last_name} ${doctor.email} ${doctor.Department?.department_name || ''}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [doctors, searchTerm]);

  // Pagination logic to display current page doctors
  const paginatedDoctors = useMemo(() => {
    const start = pageIndex * pageSize;
    return filteredDoctors.slice(start, start + pageSize);
  }, [filteredDoctors, pageIndex, pageSize]);

  const totalPages = Math.ceil(filteredDoctors.length / pageSize);

  const handleView = (doctor_id: number) => {
    router.push(`/dashboard/doctor/${doctor_id}`);
  };

  const table = useReactTable({
    data: paginatedDoctors,
    columns: [
      { header: 'Doctor ID', accessorKey: 'doctor_id' },
      { header: 'First Name', accessorKey: 'first_name' },
      { header: 'Last Name', accessorKey: 'last_name' },
      { header: 'Email', accessorKey: 'email' },
      {
        header: 'Department',
        cell: ({ row }: { row: any }) => {
          const departmentName = row.original?.Department?.department_name || 'No Department Assigned';
          return departmentName;
        },
      },
      {
        header: 'Actions',
        cell: ({ row }: { row: any }) => (
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => handleView(row.original.doctor_id)}>
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
        <div className="flex items-center justfy-center space-x-2">
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
              setPageIndex(0); // Reset to first page
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

export default DoctorTable;
