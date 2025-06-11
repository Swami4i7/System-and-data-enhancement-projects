import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import sequelize from './config/database';
import routes from './routes';
import './associations/associations';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use('/api', routes);

sequelize.sync().then(() => {
  console.log('Database connected and models synced');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
