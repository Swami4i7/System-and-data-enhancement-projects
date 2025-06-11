// services/patient.service.ts
import Patient from '../models/patient';
import Doctor from '../models/doctor';
import { PatientAttributes } from '../types/types';
import MedicalRecord from '../models/medical-record';

export const getAllPatients = async () => {
  return await Patient.findAll({
    include: [
      { model: Doctor, attributes: ['first_name', 'last_name', 'email'] },
    ],
  });
};

export const getPatientById = async (patientId: number) => {
  return await Patient.findByPk(patientId, {
    include: [
      { model: MedicalRecord, attributes: ['record_id', 'patient_id', 'description'] },
    ],
  });
};

export const createPatient = async (patientData: Omit<PatientAttributes, 'patient_id'>) => {
  return await Patient.create(patientData);
};

export const updatePatient = async (patientId: number, updateData: PatientAttributes) => {
  const patient = await Patient.findByPk(patientId);
  if (patient) {
    return await patient.update(updateData);
  }
  throw new Error('Patient not found');
};

export const deletePatient = async (patientId: number) => {
  const patient = await Patient.findByPk(patientId);
  if (patient) {
    return await patient.destroy();
  }
  throw new Error('Patient not found');
};
