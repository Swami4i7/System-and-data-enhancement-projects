'use client';

import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import React, { useState } from 'react';

interface AddPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AddPatientFormData) => void;
  doctors: Doctor[];
}

interface AddPatientFormData {
  first_name: string;
  last_name: string;
  email: string;
  doctor_id: number;
}

interface Doctor {
  doctor_id: number;
  first_name: string;
  last_name: string;
}

const AddPatientModal: React.FC<AddPatientModalProps> = ({ isOpen, onClose, onSubmit, doctors }) => {
  const { register, handleSubmit, setValue } = useForm<AddPatientFormData>();
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);

  const handleDoctorChange = (value: string) => {
    setSelectedDoctor(value);
    setValue('doctor_id', parseInt(value, 10)); // Update the doctor_id in the form data
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Patient</DialogTitle>
          <VisuallyHidden>Add New Patient</VisuallyHidden>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <label>First Name</label>
              <Input
                {...register('first_name', { required: true })}
                placeholder="Enter first name"
              />
            </div>
            <div>
              <label>Last Name</label>
              <Input
                {...register('last_name', { required: true })}
                placeholder="Enter last name"
              />
            </div>
            <div>
              <label>Email</label>
              <Input
                {...register('email', { required: true })}
                placeholder="Enter email"
                type="email"
              />
            </div>

            {/* Doctor dropdown */}
            <Select onValueChange={handleDoctorChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select a Doctor" />
              </SelectTrigger>
              <SelectContent>
                {doctors.map((doctor) => (
                  <SelectItem key={doctor.doctor_id} value={doctor.doctor_id.toString()}>
                    {doctor.first_name} {doctor.last_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="submit" className="mt-2">
              Add Patient
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPatientModal;
