import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import React from 'react';

interface Department {
  department_id: number;
  department_name: string;
}

interface Appointment {
  appointment_id: number;
  appointment_date: Date;
  status: string;
}

interface AddDoctorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { first_name: string; last_name: string; email: string; department_id: number; appointments: Appointment[] }) => void;
  departments: Department[];
  appointments?: Appointment[];
}

// Enhanced function to find department name with multiple fallback checks
const findDepartmentName = (department: any): string => {
  if (!department) return 'No Department Assigned';

  const name = department.department_name || department.name || department?.data?.department_name;
  if (name) return name;

  // Fallback to search deeper if department is nested or structured differently
  for (const key in department) {
    if (typeof department[key] === 'object') {
      const nestedName = findDepartmentName(department[key]);
      if (nestedName) return nestedName;
    }
  }
  return 'No Department Assigned';
};

// Enhanced function to retrieve appointment details with flexible data structure handling
const findAppointmentDetails = (appointments: any[] = []): Appointment[] => {
  return Array.isArray(appointments)
    ? appointments.map((appointment) => ({
        appointment_id: appointment?.appointment_id || appointment?.id || Math.random(),
        appointment_date: new Date(appointment?.appointment_date || appointment?.date || Date.now()),
        status: appointment?.status || 'Unknown Status',
      }))
    : [];
};

const AddDoctorDialog: React.FC<AddDoctorDialogProps> = ({ isOpen, onClose, onSubmit, departments, appointments = [] }) => {
  const [doctorData, setDoctorData] = React.useState({
    first_name: '',
    last_name: '',
    email: '',
    department_id: 0,
    appointments: findAppointmentDetails(appointments),
  });

  const handleSubmit = () => {
    onSubmit(doctorData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800">Add Doctor</DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            Fill in the details below to add a new doctor to the system.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <Input
              placeholder="Enter first name"
              value={doctorData.first_name}
              onChange={(e) => setDoctorData({ ...doctorData, first_name: e.target.value })}
              className="mt-1 w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <Input
              placeholder="Enter last name"
              value={doctorData.last_name}
              onChange={(e) => setDoctorData({ ...doctorData, last_name: e.target.value })}
              className="mt-1 w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <Input
              placeholder="Enter email address"
              type="email"
              value={doctorData.email}
              onChange={(e) => setDoctorData({ ...doctorData, email: e.target.value })}
              className="mt-1 w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Department</label>
            <Select onValueChange={(value) => setDoctorData({ ...doctorData, department_id: Number(value) })}>
              <SelectTrigger className="mt-1 w-full">
                <SelectValue placeholder="Select Department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept.department_id} value={dept.department_id.toString()}>
                    {findDepartmentName(dept)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Display assigned appointments */}
          {/* <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-700">Assigned Appointments</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-600">
              {doctorData.appointments.length > 0 ? (
                doctorData.appointments.map((appointment) => (
                  <li key={appointment.appointment_id}>
                    {appointment.appointment_date.toDateString()} - {appointment.status}
                  </li>
                ))
              ) : (
                <li>No Appointments Available</li>
              )}
            </ul>
          </div> */}

          <Button onClick={handleSubmit} className="w-full mt-6 bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500">
            Add Doctor
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddDoctorDialog;
