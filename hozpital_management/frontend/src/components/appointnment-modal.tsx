import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogOverlay, DialogContent } from '@/components/ui/dialog';
import { DatePicker } from '@/components/ui/datepicker';


interface AddAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { appointment_date: Date; doctor_id: number; patient_id: number }) => void;
  patients: { patient_id: number; first_name: string; last_name: string }[];
  doctors: { doctor_id: number; first_name: string; last_name: string }[];
}

const AddAppointmentModal: React.FC<AddAppointmentModalProps> = ({ isOpen, onClose, onSubmit, patients, doctors }) => {
  const [formData, setFormData] = useState({
    appointment_date: new Date(), 
    doctor_id: 0,
    patient_id: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    onSubmit({
      ...formData,
      appointment_date: formData.appointment_date
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay />
      <DialogContent>
        <h2 className="text-lg font-semibold mb-4">Add Appointment</h2>
        <div className="space-y-4">
          {/* Date Picker */}
          <DatePicker 
            date={formData.appointment_date} 
            setDate={(date) => setFormData((prev) => ({ ...prev, appointment_date: date }))} 
          />

          {/* Doctor Dropdown */}
          <select name="doctor_id" value={formData.doctor_id} onChange={handleChange}>
            <option value="">Select Doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor.doctor_id} value={doctor.doctor_id}>
                {doctor.first_name} {doctor.last_name}
              </option>
            ))}
          </select>

          {/* Patient Dropdown */}
          <select name="patient_id" value={formData.patient_id} onChange={handleChange}>
            <option value="">Select Patient</option>
            {patients.map((patient) => (
              <option key={patient.patient_id} value={patient.patient_id}>
                {patient.first_name} {patient.last_name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end mt-4">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add Appointment</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddAppointmentModal;
