"use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Eye, EyeOff, Mail, User, Phone, Lock, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { Checkbox } from '@/components/ui/Checkbox';
import { Label } from '@/components/ui/Label';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

// Form validation schema
const registerSchema = z.object({
  firstName: z.string()
    .min(2, 'First name must be at least  2characters')
    .max(50, 'First name must not exceed 50characters'),

  lastName: z.string()
    .min(2, 'Last name must be at least 2characters')
    .max(50, 'Last name must not exceed 50characters'),

  email: z.string()
    .email('Please enter a valid email address')
    .min(5, 'Email must be at least 5characters')
    .max(254, 'Email must not exceed 254characters'),

  phone: z.string()
    .regex(/^[+]?\d{10,15}$/, 'Please enter a valid phone number (10-15 digits)')
    .optional(),

  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password must not exceed 128 characters')

    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),

  confirmPassword: z.string(),

  agreeToTerms: z.boolean().refine(val => val === true, 'You must agree to the Terms of Service'),

  agreeToPrivacy: z.boolean().refine(val => val === true, 'You must agree to the Privacy Policy'),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors, isValid }, watch } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false,
      agreeToPrivacy: false,
    },
    mode: 'onChange',
  });

  const password = watch('password');

  const passwordRequirements = [
    { regex: /[A-Z]/, label: 'At least one uppercase letter' },
    { regex: /[a-z]/, label: 'At least one lowercase letter' },
    { regex: /[0-9]/, label: 'At least one number' },
    { regex: /[^A-Za-z0-9]/, label: 'At least one special character' },
    { regex: /^.{8,}$/, label: 'At least 8 characters' },
  ];

  const getPasswordRequirementStatus = (requirement: { regex: RegExp; label: string }) => {
    return password ? requirement.regex.test(password) : false;
  };

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      console.log('Registration data:', data);
      // Here you would typically call your registration API
      // await registerUser(data);

      // For demo, just redirect to login after successful registration
      console.log('Registration successful!');
      // Router.push('/login'); // Uncomment for real app
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div classno...