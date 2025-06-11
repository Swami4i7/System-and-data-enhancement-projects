import { Router } from 'express';
import { getMedicalRecords, getMedicalRecord, addMedicalRecord, editMedicalRecord, removeMedicalRecord } from '../controller/medical-record-controller';
import { authenticate, authorizeRoles } from '../middlewares/auth-middleware';

const router = Router();

router.get('/', authenticate, getMedicalRecords);
router.get('/:id', getMedicalRecord);
router.post('/', authenticate, authorizeRoles(['doctor', 'admin']), addMedicalRecord);
router.put('/:id', authenticate, authorizeRoles(['doctor', 'admin']), editMedicalRecord);
router.delete('/:id', authenticate, authorizeRoles(['admin']), removeMedicalRecord);

export default router;
