// services/appointment.service.ts
import Appointment from '../models/appointment';
import Doctor from '../models/doctor';
import Patient from '../models/patient';
import { AppointmentAttributes } from '../types/types';

export const getAllAppointments = async () => {
  return await Appointment.findAll({
    include: [
      { model: Doctor, attributes: ['first_name', 'last_name'] },
      { model: Patient, attributes: ['first_name', 'last_name'] },
    ],
  });
};

export const getAppointmentById = async (appointmentId: number) => {
  return await Appointment.findByPk(appointmentId, {
    include: [
      { model: Doctor, attributes: ['first_name', 'last_name'] },
      { model: Patient, attributes: ['first_name', 'last_name'] },
    ],
  });
};

export const createAppointment = async (appointmentData: Omit<AppointmentAttributes, 'appointment_id' & 'status'>) => {
  let status='Pending'
  const { patient_id, doctor_id, appointment_date } = appointmentData;

  const appointment = await Appointment.create({
    patient_id,
    doctor_id,
    appointment_date,
    status
  });
  return appointment;
};

export const updateAppointment = async (appointmentId: number, updateData: AppointmentAttributes) => {
  const appointment = await Appointment.findByPk(appointmentId);
  if (appointment) {
    return await appointment.update(updateData);
  }
  throw new Error('Appointment not found');
};

export const deleteAppointment = async (appointmentId: number) => {
  const appointment = await Appointment.findByPk(appointmentId);
  if (appointment) {
    return await appointment.destroy();
  }
  throw new Error('Appointment not found');
};
