import UserCredentials from '../models/user';
import { UserCredentialsAttributes } from '../types/types';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwt';

export const registerUser = async (userData: Omit<UserCredentialsAttributes, 'user_id' & 'role'>) => {
  let role='admin';
  const { username, email, password } = userData;

  const existingUser = await UserCredentials.findOne({ where: { email } });
  if (existingUser) {
    throw new Error('User already exists');
  }

  // Hash password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await UserCredentials.create({
    username,
    email,
    password: hashedPassword,
    role,
  });

  return user;
};

// Login User
export const loginUser = async (email: string, password: string) => {
  // Check if user exists
  const user = await UserCredentials.findOne({ where: { email } });
  if (!user) {
    throw new Error('User not found');
  }

  // Compare passwords
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  const token = generateToken({ user_id: user.user_id, role: user.role });
  return { user, token };
};
