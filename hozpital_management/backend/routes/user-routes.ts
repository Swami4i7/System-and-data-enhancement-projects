import { Router } from 'express';
import { signup, login, logout } from '../controller/user-controller';
import { authenticate, authorizeRoles } from '../middlewares/auth-middleware';

const router = Router();

router.post('/signup', signup);
router.post('/login', login,);
router.post('/logout', logout);

export default router;
