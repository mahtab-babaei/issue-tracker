import { z } from 'zod';

export const issueSchema = z.object({
  title: z.string().min(1, 'Title is required.').max(255),
  description: z.string().min(1, 'Description is is required.')
});

export const registerUserSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.string().min(1, 'Email required.').email('Invalid email.'),
  password: z.string().min(5, 'Password must be at least 5 characters'),
  confirmPassword: z.string().min(5, 'Password must be at least 5 characters')
}).refine((data) => data.password === data.confirmPassword, {
  message: 'The passwords did not match.',
  path: ['confirmPassword']
})