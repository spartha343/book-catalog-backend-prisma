import { UserRole } from '@prisma/client';
import { z } from 'zod';

const UpdateUserZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    role: z
      .enum([...Object.keys(UserRole)] as [string, ...string[]])
      .optional(),
    contactNo: z.string().optional(),
    address: z.string().optional(),
    profileImg: z.string().optional()
  })
});

export const UserValidation = {
  UpdateUserZodSchema
};
