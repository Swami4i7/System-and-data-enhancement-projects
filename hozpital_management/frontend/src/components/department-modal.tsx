import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';

interface Doctor {
  doctor_id: number;
  first_name: string;
  last_name: string;
  department_id: number;
}

interface Department {
  department_id: number;
  department_name: string;
  location: string;
}

interface AddDepartmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: DepartmentFormData) => void;
  department?: Department; // Optional for editing an existing department
  doctors: Doctor[]; // List of all doctors
}

interface DepartmentFormData {
  department_name: string;
  location: string;
}

const AddDepartmentModal: React.FC<AddDepartmentModalProps> = ({ isOpen, onClose, onSubmit, department, doctors }) => {
  const { register, handleSubmit, reset } = useForm<DepartmentFormData>();

  useEffect(() => {
    // Reset form fields when the modal opens or closes
    if (isOpen) {
      reset({
        department_name: department?.department_name || '',
        location: department?.location || '',
      });
    }
  }, [isOpen, department, reset]);

  const handleFormSubmit = (data: DepartmentFormData) => {
    onSubmit(data);
    reset();
  };

  // Filter doctors associated with the department ID
  const associatedDoctors = department
    ? doctors.filter((doctor) => doctor.department_id === department.department_id)
    : []||['Ram', 'Krishna', 'Shiva'];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{department ? 'Edit Department' : 'Add Department'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <Input
            {...register('department_name', { required: true })}
            placeholder="Department Name"
            defaultValue={department?.department_name || ''}
            className="mb-4"
          />
          <Input
            {...register('location', { required: true })}
            placeholder="Location"
            defaultValue={department?.location || ''}
            className="mb-4"
          />
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-900 text-white">
              {department ? 'Update Department' : 'Add Department'}
            </Button>
          </div>
        </form>

        {/* Display associated doctors only if editing an existing department */}
        {department && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Associated Doctors</h3>
            {associatedDoctors.length > 0 ? (
              <ul className="list-disc pl-5 mt-2">
                {associatedDoctors.map((doctor) => (
                  <li key={doctor.doctor_id} className="text-gray-700">
                    {doctor.first_name} {doctor.last_name}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-gray-500">No doctors assigned to this department.</p>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddDepartmentModal;
