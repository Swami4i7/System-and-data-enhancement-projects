import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Doctor extends Model {}

Doctor.init({
  doctor_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false, // This is important
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  department_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'departments',
      key: 'department_id',
    },
  },
}, {
  sequelize,
  modelName: 'Doctor',
  tableName: 'doctors',
});

export default Doctor;
