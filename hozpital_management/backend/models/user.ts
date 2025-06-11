import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class UserCredentials extends Model {
  public user_id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public role!: string;
}

UserCredentials.init({
  user_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'doctor',
  }
}, {
  sequelize,
  modelName: 'UserCredentials',
  tableName: 'user_credentials',
});

export default UserCredentials;
