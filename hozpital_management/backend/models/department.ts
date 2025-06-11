import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Department extends Model {}

Department.init({
  department_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  department_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'Department',
  tableName: 'departments'
});

export default Department;
