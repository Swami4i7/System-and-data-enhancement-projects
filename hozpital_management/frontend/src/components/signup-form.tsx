'use client';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from './ui/card';
import { Label } from './ui/label';
import api from '../app/utils/axios';
import { SignupResponse } from '../lib/types';

interface SignupFormInputs {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

async function signupUser(username: string, email: string, password: string) {
  try {
    const response = await api.post<SignupResponse>('/auth/signup', { username, email, password });
    const data = response.data;
    

    if (response.status >= 200 && response.status < 300) {
      alert('Signup successful! Redirecting to login...');
      window.location.href = '/login';
    } else {
      console.log(data);
      throw new Error(data.error || 'Signup failed');
    }
  } catch (error) {
    console.error('Signup error:', (error as Error).message);
    alert('Signup failed: ' + (error as Error).message);
  }
}

export const SignupPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormInputs>();

  const onSubmit: SubmitHandler<SignupFormInputs> = async (data) => {
    const { username, email, password } = data;
    await signupUser(username, email, password);
  };

  const password = watch('password');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 w-3/4">
      <Card className="mx-auto max-w-sm shadow-lg border border-gray-200 bg-white rounded-lg p-6 w-3/4">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-cyan-600 font-bold">Sign Up</CardTitle>
          <CardDescription className="text-gray-600">
            Create an account by filling out the form below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="username" className="text-sm text-gray-700">
                User Name
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                className="border-gray-300 focus:border-cyan-500 focus:ring-cyan-500"
                {...register('username', { required: 'Username is required' })}
              />
              {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
            </div>

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
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password" className="text-sm text-gray-700">
                Password
              </Label>
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
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="confirmPassword" className="text-sm text-gray-700">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                className="border-gray-300 focus:border-cyan-500 focus:ring-cyan-500"
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: (value) =>
                    value === password || 'The passwords do not match',
                })}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full bg-cyan-600 text-white hover:bg-cyan-700">
              Sign Up
            </Button>
          </form>

          <div className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-cyan-600 underline">
              Log in
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupPage;
