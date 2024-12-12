import { z } from 'zod';

const CreateCategoryZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title Is Required !'
    })
  })
});

const UpdateCategoryZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title Is Required !'
    })
  })
});

export const CategoryValidation = {
  CreateCategoryZodSchema,
  UpdateCategoryZodSchema
};
