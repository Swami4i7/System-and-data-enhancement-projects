import { Router } from 'express';
import { getPatients, getPatient, addPatient, editPatient, removePatient } from '../controller/patient-controller';
import { authenticate, authorizeRoles } from '../middlewares/auth-middleware';

const router = Router();

router.get('/', authenticate, getPatients);
router.get('/:id', getPatient);
router.post('/', authenticate, authorizeRoles(['doctor', 'admin']), addPatient);
router.put('/:id', authenticate, authorizeRoles(['doctor', 'admin']), editPatient);
router.delete('/:id', authenticate, authorizeRoles(['admin']), removePatient);

export default router;
