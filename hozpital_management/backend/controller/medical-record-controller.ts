import { Request, Response } from 'express';
import { getAllMedicalRecords, getMedicalRecordById, createMedicalRecord, updateMedicalRecord, deleteMedicalRecord } from '../services/medical-record-service';

export const getMedicalRecords = async (req: Request, res: Response) => {
  try {
    const medicalRecords = await getAllMedicalRecords();
    res.status(200).json(medicalRecords);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getMedicalRecord = async (req: Request, res: Response) => {
  try {
    const medicalRecord = await getMedicalRecordById(Number(req.params.id));
    res.status(200).json(medicalRecord);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const addMedicalRecord = async (req: Request, res: Response) => {
  try {
    const medicalRecord = await createMedicalRecord(req.body);
    res.status(201).json(medicalRecord);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const editMedicalRecord = async (req: Request, res: Response) => {
  try {
    const updatedRecord = await updateMedicalRecord(Number(req.params.id), req.body);
    res.status(200).json(updatedRecord);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const removeMedicalRecord = async (req: Request, res: Response) => {
  try {
    await deleteMedicalRecord(Number(req.params.id));
    res.status(204).json({});
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
