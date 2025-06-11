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

interface Doctor {
  doctor_id: number;
  first_name: string;
  last_name: string;
}

interface Patient {
  patient_id: number;
  first_name: string;
  last_name: string;
  email: string;
  doctor_id: number;
}

interface EditPatientDialogProps {
  isOpen: boolean;
  onClose: () => void;
  patient?: Patient; // Optional to avoid undefined errors
  doctors: Doctor[];
  onSubmit: (updatedPatient: Patient) => void;
}

const EditPatientDialog: React.FC<EditPatientDialogProps> = ({
  isOpen,
  onClose,
  patient = { patient_id: 0, first_name: '', last_name: '', email: '', doctor_id: 0 }, // Default patient structure
  doctors,
  onSubmit,
}) => {
  const [patientData, setPatientData] = React.useState<Patient>(patient);

  useEffect(() => {
    setPatientData(patient); // Update state when patient prop changes
  }, [patient]);

  const handleSubmit = () => {
    onSubmit(patientData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800">Edit Patient Details</DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            Update the information below to edit the patient’s details.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <Input
              placeholder="Enter first name"
              value={patientData.first_name}
              onChange={(e) => setPatientData({ ...patientData, first_name: e.target.value })}
              className="mt-1 w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <Input
              placeholder="Enter last name"
              value={patientData.last_name}
              onChange={(e) => setPatientData({ ...patientData, last_name: e.target.value })}
              className="mt-1 w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <Input
              placeholder="Enter email address"
              type="email"
              value={patientData.email}
              onChange={(e) => setPatientData({ ...patientData, email: e.target.value })}
              className="mt-1 w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Doctor</label>
            <Select
              onValueChange={(value) => setPatientData({ ...patientData, doctor_id: Number(value) })}
              value={patientData.doctor_id.toString()}
            >
              <SelectTrigger className="mt-1 w-full">
                <SelectValue placeholder="Select Doctor" />
              </SelectTrigger>
              <SelectContent>
                {doctors.map((doctor) => (
                  <SelectItem key={doctor.doctor_id} value={doctor.doctor_id.toString()}>
                    {`${doctor.first_name} ${doctor.last_name}`}
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

export default EditPatientDialog;
