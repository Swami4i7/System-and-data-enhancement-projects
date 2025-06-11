import { Request, Response } from 'express';
import { getAllAppointments, getAppointmentById, createAppointment, updateAppointment, deleteAppointment } from '../services/appointment-service';

export const getAppointments = async (req: Request, res: Response) => {
  try {
    const appointments = await getAllAppointments();
    console.log(appointments)
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getAppointment = async (req: Request, res: Response) => {
  try {
    const appointment = await getAppointmentById(Number(req.params.id));
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const addAppointment = async (req: Request, res: Response) => {
  try {
    const appointment = await createAppointment(req.body);
    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const editAppointment = async (req: Request, res: Response) => {
  try {
    const updatedAppointment = await updateAppointment(Number(req.params.id), req.body);
    res.status(200).json(updatedAppointment);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const removeAppointment = async (req: Request, res: Response) => {
  try {
    await deleteAppointment(Number(req.params.id));
    res.status(204).json({});
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
