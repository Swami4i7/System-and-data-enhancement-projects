import React, { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Department {
  department_id: number;
  department_name: string;
}

interface Doctor {
  doctor_id: number;
  first_name: string;
  last_name: string;
  email: string;
  department_id: number;
}

interface EditDoctorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  doctor?: Doctor | null;
  departments: Department[];
  onSubmit: (updatedDoctor: Doctor) => void;
}

const EditDoctorDialog: React.FC<EditDoctorDialogProps> = ({
  isOpen,
  onClose,
  doctor,
  departments,
  onSubmit,
}) => {

    const [doctorData, setDoctorData] = React.useState<Doctor>({
    doctor_id: doctor?.doctor_id || 0,
    first_name: doctor?.first_name || '',
    last_name: doctor?.last_name || '',
    email: doctor?.email || '',
    department_id: doctor?.department_id || 0,
  });

  useEffect(() => {
    // Update state only when doctor is provided
    if (doctor) {
      setDoctorData({
        doctor_id: doctor.doctor_id,
        first_name: doctor.first_name,
        last_name: doctor.last_name,
        email: doctor.email,
        department_id: doctor.department_id,
      });
    }
  }, [doctor]);

  const handleSubmit = () => {
    onSubmit(doctorData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800">Edit Doctor Details</DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            Update the information below to edit the doctor’s details.
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
            <Select
              onValueChange={(value) => setDoctorData({ ...doctorData, department_id: Number(value) })}
              value={doctorData.department_id.toString()}
            >
              <SelectTrigger className="mt-1 w-full">
                <SelectValue placeholder="Select Department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept.department_id} value={dept.department_id.toString()}>
                    {dept.department_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            onClick={handleSubmit}
            className="w-full mt-6 bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
          >
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditDoctorDialog;
