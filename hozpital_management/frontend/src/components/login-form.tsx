'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { setCookie } from 'cookies-next';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { AuthToken } from '../lib/types';
import api from '../app/utils/axios';

async function loginUser(email: string, password: string) {
  try {
    const response = await api.post('/auth/login', {
      email,
      password
    });

    const data = response.data as AuthToken; 

    if (response.status === 200) {
      setAuthToken(data.token);
      window.location.href = '/dashboard';
    } else {
      throw new Error('Login failed');
    }
  } catch (error) {
    console.error('Login error:', (error as Error).message);
    alert('Login failed: ' + (error as Error).message);
  }
}

function setAuthToken(token: string) {
  setCookie('authToken', token, {
    path: '/',
    domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN || undefined,
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60, 
    sameSite: 'lax',
  });
}
export const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    const { email, password } = data;

    await loginUser(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 w-3/4">
      <Card className="mx-auto max-w-sm shadow-lg border border-gray-200 bg-white rounded-lg p-6 w-3/4">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-cyan-600 font-bold">Login</CardTitle>
          <CardDescription className="text-gray-600">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-sm text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="border-gray-300 focus:border-cyan-500 focus:ring-cyan-500"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Entered value does not match email format',
                  },
                })}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message as string}</p>}
            </div>

            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password" className="text-sm text-gray-700">
                  Password
                </Label>
                <a href="#" className="ml-auto text-sm text-cyan-600 underline">
                  Forgot your password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="border-gray-300 focus:border-cyan-500 focus:ring-cyan-500"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message as string}</p>}
            </div>
            <Button type="submit" className="w-full bg-cyan-600 text-white hover:bg-cyan-700">
              Login
            </Button>
          </form>

          <div className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/signup" className="text-cyan-600 underline">
              Sign up
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
