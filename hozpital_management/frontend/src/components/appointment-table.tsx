import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table as UITable } from '@/components/ui/table';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

interface Doctor {
  first_name: string;
  last_name: string;
}

interface Patient {
  first_name: string;
  last_name: string;
}

interface Appointment {
  appointment_id: number;
  appointment_date: Date;
  status: string;
  doctor: Doctor;
  patient: Patient;
}

interface AppointmentTableProps {
  appointments: Appointment[];
  onApprove: (appointment: Appointment) => Promise<void>;
  onReject: (appointment: Appointment) => Promise<void>;
}

const AppointmentTable: React.FC<AppointmentTableProps> = ({ appointments, onApprove, onReject }) => {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  // Pagination logic
  const paginatedAppointments = useMemo(() => {
    const start = pageIndex * pageSize;
    return appointments.slice(start, start + pageSize);
  }, [appointments, pageIndex, pageSize]);

  const totalPages = Math.ceil(appointments.length / pageSize);

  const table = useReactTable({
    data: paginatedAppointments,
    columns: [
      { 
        header: 'Appointment Date', 
        accessorKey: 'appointment_date',
        cell: ({ row }: { row: any }) => {
          const date = row.original?.appointment_date || row.original?.AppointmentDate || row.original?.date;
          return date ? format(new Date(date), 'MMMM dd, yyyy') : 'No Date Available';
        },
      },
      { 
        header: 'Doctor', 
        accessorKey: 'doctor', 
        cell: ({ row }: { row: any }) => 
          row.original?.doctor?.first_name 
            ? `${row.original.doctor.first_name} ${row.original.doctor.last_name}` 
            : row.original?.Doctor?.first_name 
            ? `${row.original.Doctor.first_name} ${row.original.Doctor.last_name}`
            : 'No Doctor Assigned'
      },
      { 
        header: 'Patient', 
        accessorKey: 'patient', 
        cell: ({ row }: { row: any }) => 
          row.original?.patient?.first_name 
            ? `${row.original.patient.first_name} ${row.original.patient.last_name}` 
            : row.original?.Patient?.first_name 
            ? `${row.original.Patient.first_name} ${row.original.Patient.last_name}`
            : 'No Patient Assigned'
      },
      { header: 'Status', accessorKey: 'status' },
      {
        header: 'Actions',
        cell: ({ row }: { row: any }) => (
          row.original.status === 'Pending' ? (
            <div className="flex space-x-2">
              <Button variant="ghost" onClick={() => onApprove(row.original)}>Approve</Button>
              <Button variant="destructive" onClick={() => onReject(row.original)}>Reject</Button>
            </div>
          ) : null
        ),
      },
    ],
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="w-full bg-white shadow-md rounded-lg p-6">
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

        {/* Page Size Selector */}
        <div className="flex items-center space-x-2">
          <label htmlFor="pageSize" className="text-gray-700">Rows per page:</label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPageIndex(0); 
            }}
            className="bg-white border border-gray-300 rounded-md p-1"
          >
            {[5, 10, 20].map((size) => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>
      </div>
    </motion.div>
  );
};

export default AppointmentTable;
