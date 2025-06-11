import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'hospital',
  process.env.DB_USER || 'root',
  process.env.DB_PASS || 'root',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
  }
);
sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch((error) => console.error('Unable to connect to the database:', error));


export default sequelize;
