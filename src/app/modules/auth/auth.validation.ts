import { UserRole } from '@prisma/client';
import { z } from 'zod';

const SignupZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name Is Required !'
    }),
    email: z
      .string({
        required_error: 'Email Is Required !'
      })
      .email(),
    password: z.string({
      required_error: 'Password Is Required !'
    }),
    role: z.enum([...Object.keys(UserRole)] as [string, ...string[]]),
    contactNo: z.string({
      required_error: 'Contact No Is Required !'
    }),
    address: z.string({
      required_error: 'Address Is Required !'
    }),
    profileImg: z.string().optional()
  })
});

const SigninZodSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email Is Required !'
      })
      .email(),
    password: z.string({
      required_error: 'Password Is Required !'
    })
  })
});

export const AuthValidation = {
  SignupZodSchema,
  SigninZodSchema
};
