import { Router } from 'express';
import { getAppointments, getAppointment, addAppointment, editAppointment, removeAppointment } from '../controller/appointment-controller';
import { authenticate, authorizeRoles } from '../middlewares/auth-middleware';

const router = Router();

router.get('/', authenticate, getAppointments);
router.get('/:id', getAppointment);
router.post('/', authenticate, authorizeRoles(['doctor', 'admin']), addAppointment);
router.put('/:id', authenticate, authorizeRoles(['doctor', 'admin']), editAppointment);
router.delete('/:id', authenticate, authorizeRoles(['admin']), removeAppointment);

export default router;
