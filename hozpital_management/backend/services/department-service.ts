// services/department.service.ts
import Department from '../models/department';
import Doctor from '../models/doctor';
import { DepartmentAttributes } from '../types/types';

export const getAllDepartments = async () => {
  return await Department.findAll({
    include: [{ model: Doctor, attributes: ['first_name', 'last_name'] }],
  });
};

export const getDepartmentById = async (departmentId: number) => {
  return await Department.findByPk(departmentId, {
    include: [{ model: Doctor, attributes: ['doctor_id', 'first_name', 'last_name', 'email'] }],
  });
};

export const createDepartment = async (departmentData: Omit<DepartmentAttributes, 'department_id'>) => {
  return await Department.create(departmentData);
};

export const updateDepartment = async (departmentId: number, updateData: DepartmentAttributes) => {
  const department = await Department.findByPk(departmentId);
  if (department) {
    return await department.update(updateData);
  }
  throw new Error('Department not found');
};

export const deleteDepartment = async (departmentId: number) => {
  const department = await Department.findByPk(departmentId);
  if (department) {
    return await department.destroy();
  }
  throw new Error('Department not found');
};
