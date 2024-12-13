'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.AuthValidation = void 0;
const client_1 = require('@prisma/client');
const zod_1 = require('zod');
const SignupZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    name: zod_1.z.string({
      required_error: 'Name Is Required !'
    }),
    email: zod_1.z
      .string({
        required_error: 'Email Is Required !'
      })
      .email(),
    password: zod_1.z.string({
      required_error: 'Password Is Required !'
    }),
    role: zod_1.z.enum([...Object.keys(client_1.UserRole)]),
    contactNo: zod_1.z.string({
      required_error: 'Contact No Is Required !'
    }),
    address: zod_1.z.string({
      required_error: 'Address Is Required !'
    }),
    profileImg: zod_1.z.string().optional()
  })
});
const SigninZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    email: zod_1.z
      .string({
        required_error: 'Email Is Required !'
      })
      .email(),
    password: zod_1.z.string({
      required_error: 'Password Is Required !'
    })
  })
});
exports.AuthValidation = {
  SignupZodSchema,
  SigninZodSchema
};
