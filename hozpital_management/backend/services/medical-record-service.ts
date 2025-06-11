// services/medicalRecord.service.ts
import MedicalRecord from '../models/medical-record';
import Patient from '../models/patient';
import { MedicalRecordAttributes } from '../types/types';

export const getAllMedicalRecords = async () => {
  return await MedicalRecord.findAll({
    include: [{ model: Patient, attributes: ['first_name', 'last_name'] }],
  });
};

export const getMedicalRecordById = async (recordId: number) => {
  return await MedicalRecord.findByPk(recordId, {
    include: [{ model: Patient, attributes: ['first_name', 'last_name'] }],
  });
};

export const createMedicalRecord = async (medicalRecordData: Omit<MedicalRecordAttributes, 'record_id'>) => {
  return await MedicalRecord.create(medicalRecordData);
};

export const updateMedicalRecord = async (recordId: number, updateData: MedicalRecordAttributes) => {
  const record = await MedicalRecord.findByPk(recordId);
  if (record) {
    return await record.update(updateData);
  }
  throw new Error('Medical record not found');
};

export const deleteMedicalRecord = async (recordId: number) => {
  const record = await MedicalRecord.findByPk(recordId);
  if (record) {
    return await record.destroy();
  }
  throw new Error('Medical record not found');
};
