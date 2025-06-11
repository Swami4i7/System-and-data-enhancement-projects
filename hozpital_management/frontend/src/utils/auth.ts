// utils/auth.ts
import { deleteCookie, getCookie } from 'cookies-next';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/navigation';

const SECRET_KEY = process.env.JWT_SECRET!;

export const checkAuth = () => {
  const token = getCookie('authToken');
  if (!token) {
    deleteCookie('authToken');
    return false;
  }
  return true;
};

export function logoutUser() {
  deleteCookie('authToken', {
    path: '/',
  });
}

export const useAuthCheck = () => {
  const router = useRouter();

  if (!checkAuth()) {
    router.push('/login'); 
  }
};

export function verifyToken(req: Request) {
  const token = getCookie('authToken', { req });

  if (!token) {
    return { valid: false, error: 'No token' };
  }

  try {
    const decoded = jwt.verify(token as string, SECRET_KEY);
    return { valid: true, decoded };
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return { valid: false, error: 'Token expired' };
    }
    return { valid: false, error: 'Invalid token' };
  }
}
