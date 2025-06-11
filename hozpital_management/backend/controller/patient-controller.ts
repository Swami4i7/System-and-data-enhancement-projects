import { Request, Response } from 'express';
import { getAllPatients, getPatientById, createPatient, updatePatient, deletePatient } from '../services/patient-service';

export const getPatients = async (req: Request, res: Response) => {
  try {
    const patients = await getAllPatients();
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getPatient = async (req: Request, res: Response) => {
  try {
    const patient = await getPatientById(Number(req.params.id));
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const addPatient = async (req: Request, res: Response) => {
  try {
    const patient = await createPatient(req.body);
    res.status(201).json(patient);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const editPatient = async (req: Request, res: Response) => {
  try {
    const updatedPatient = await updatePatient(Number(req.params.id), req.body);
    res.status(200).json(updatedPatient);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const removePatient = async (req: Request, res: Response) => {
  try {
    await deletePatient(Number(req.params.id));
    res.status(204).json({});
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
