import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table as UITable } from '@/components/ui/table';
import { motion } from 'framer-motion';

interface Doctor {
  doctor_id: number;
  first_name: string;
  last_name: string;
}

interface Department {
  department_id: number;
  department_name: string;
  location: string;
  doctors: Doctor[];
}

interface DepartmentTableProps {
  departments: Department[];
}

const DepartmentTable: React.FC<DepartmentTableProps> = ({ departments }) => {
  const router = useRouter();
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const handleViewDepartment = (department_id: number) => {
    router.push(`/dashboard/department/${department_id}`);
  };

  // Pagination logic
  const paginatedDepartments = useMemo(() => {
    const start = pageIndex * pageSize;
    return departments.slice(start, start + pageSize);
  }, [departments, pageIndex, pageSize]);

  const totalPages = Math.ceil(departments.length / pageSize);

  const table = useReactTable({
    data: paginatedDepartments,
    columns: [
      { header: 'Department ID', accessorKey: 'department_id' },
      { header: 'Department Name', accessorKey: 'department_name' },
      { header: 'Location', accessorKey: 'location' },
      {
        header: 'Actions',
        cell: ({ row }: { row: any }) => (
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => handleViewDepartment(row.original.department_id)}>
              View Department
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
      <div className="flex items-center justify-between mt-4 ">
        {/* Page Navigation */}
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
              setPageIndex(0); // Reset to the first page when page size changes
            }}
            className="bg-white border border-gray-300 rounded-md p-1"
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

export default DepartmentTable;
