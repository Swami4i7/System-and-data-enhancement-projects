// services/doctor.service.ts
import Doctor from '../models/doctor';
import Department from '../models/department';
import Patient from '../models/patient';
import { DoctorAttributes } from '../types/types';
import Appointment from '../models/appointment';

export const getAllDoctors = async () => {
  return await Doctor.findAll({
    include: [
      { model: Department, attributes: ['department_name', 'department_id'] },
      { model: Patient, attributes: ['first_name', 'last_name'] },
    ],
  });
};

export const getDoctorById = async (doctorId: number) => {
  return await Doctor.findByPk(doctorId, {
    include: [
      { model: Department, attributes: ['department_name'] },
      { model: Patient, attributes: ['first_name', 'last_name'] },
      { model: Appointment, attributes:['appointment_id', 'appointment_date','status','doctor_id','patient_id']}
    ],
  });
};

export const createDoctor = async (doctorData: Omit<DoctorAttributes, 'doctor_id'>) => {
  return await Doctor.create(doctorData);
};

export const updateDoctor = async (doctorId: number, updateData: DoctorAttributes) => {
  const doctor = await Doctor.findByPk(doctorId);
  if (doctor) {
    return await doctor.update(updateData);
  }
  throw new Error('Doctor not found');
};

export const deleteDoctor = async (doctorId: number) => {
  const doctor = await Doctor.findByPk(doctorId);
  if (doctor) {
    return await doctor.destroy();
  }
  throw new Error('Doctor not found');
};
