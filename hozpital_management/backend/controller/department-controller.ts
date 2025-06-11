import { Request, Response } from 'express';
import { getAllDepartments, getDepartmentById, createDepartment, updateDepartment, deleteDepartment } from '../services/department-service';

export const getDepartments = async (req: Request, res: Response) => {
  try {
    const departments = await getAllDepartments();
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ error: (error as Error)  .message });
  }
};

export const getDepartment = async (req: Request, res: Response) => {
  try {
    const department = await getDepartmentById(Number(req.params.id));
    res.status(200).json(department);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const addDepartment = async (req: Request, res: Response) => {
  try {
    const department = await createDepartment(req.body);
    res.status(201).json(department);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const editDepartment = async (req: Request, res: Response) => {
  try {
    const updatedDepartment = await updateDepartment(Number(req.params.id), req.body);
    res.status(200).json(updatedDepartment);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const removeDepartment = async (req: Request, res: Response) => {
  try {
    await deleteDepartment(Number(req.params.id));
    res.status(204).json({});
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
