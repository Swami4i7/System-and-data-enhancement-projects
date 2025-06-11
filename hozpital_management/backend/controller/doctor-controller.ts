import { Request, Response } from 'express';
import Doctor from '../models/doctor';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getAllDoctors, getDoctorById, createDoctor, updateDoctor, deleteDoctor } from '../services/doctor-service';
import { DoctorAttributes } from '../types/types';

export const getDoctors = async (req: Request, res: Response) => {
  try {
    const doctors = await getAllDoctors();
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getDoctor = async (req: Request, res: Response) => {
  try {
    const doctor = await getDoctorById(Number(req.params.id));
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const addDoctor = async (req: Request, res: Response) => {
  try {
    const doctor = await createDoctor(req.body);
    res.status(201).json(doctor);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const editDoctor = async (req: Request, res: Response) => {
  try {
    const updatedDoctor = await updateDoctor(Number(req.params.id), req.body);
    res.status(200).json(updatedDoctor);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const removeDoctor = async (req: Request, res: Response) => {
  try {
    await deleteDoctor(Number(req.params.id));
    res.status(204).json({});
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};


