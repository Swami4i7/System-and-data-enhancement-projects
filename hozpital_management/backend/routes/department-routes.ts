import { Router } from 'express';
import { getDepartments, getDepartment, addDepartment, editDepartment, removeDepartment } from '../controller/department-controller';
import { authenticate, authorizeRoles } from '../middlewares/auth-middleware';

const router = Router();

router.get('/', authenticate, getDepartments);
router.get('/:id', getDepartment);
router.post('/', authenticate, authorizeRoles(['admin']), addDepartment);
router.put('/:id', authenticate, authorizeRoles(['admin']), editDepartment);
router.delete('/:id', authenticate, authorizeRoles(['admin']), removeDepartment);

export default router;
