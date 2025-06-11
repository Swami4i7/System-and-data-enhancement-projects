import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
sequelize.getQueryInterface().dropTable('appointments');

class Appointment extends Model {}

Appointment.init({
  appointment_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  appointment_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  patient_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'patients',
      key: 'patient_id',
    },
  },
  doctor_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'doctors',
      key: 'doctor_id',
    },
  },
}, {
  sequelize,
  modelName: 'Appointment',
  tableName: 'appointments',
});

export default Appointment;
