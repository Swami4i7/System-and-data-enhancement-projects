import { Router } from 'express';
import { getDoctors, getDoctor, addDoctor, editDoctor, removeDoctor } from '../controller/doctor-controller';
import { authenticate, authorizeRoles } from '../middlewares/auth-middleware';

const router = Router();

router.get('/', authenticate, getDoctors);
router.get('/:id', getDoctor);
router.post('/', authenticate, authorizeRoles(['admin']), addDoctor);
router.put('/:id', authenticate, authorizeRoles(['admin']), editDoctor);
router.delete('/:id', authenticate, authorizeRoles(['admin']), removeDoctor);

export default router;
