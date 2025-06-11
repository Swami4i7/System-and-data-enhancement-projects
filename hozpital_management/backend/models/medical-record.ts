import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class MedicalRecord extends Model {}

MedicalRecord.init({
  record_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  patient_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'MedicalRecord',
  tableName: 'medical_records'
});

export default MedicalRecord;
