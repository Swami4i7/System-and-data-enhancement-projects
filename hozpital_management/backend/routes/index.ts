import { Router } from 'express';
import doctorRoutes from './doctor-routes';
import patientRoutes from './patient-routes';
import departmentRoutes from './department-routes';
import appointmentRoutes from './appointment-routes';
import medicalRecordRoutes from './medical-record-routes';
import userCredentialsRoutes from './user-routes';

const router = Router();


router.use('/doctors', doctorRoutes);
router.use('/patients', patientRoutes);
router.use('/departments', departmentRoutes);
router.use('/appointments', appointmentRoutes);
router.use('/medicalrecords', medicalRecordRoutes);
router.use('/auth', userCredentialsRoutes); 

export default router;
