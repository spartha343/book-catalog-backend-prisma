import { z } from 'zod';

const CreateBookZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title Is Required !'
    }),
    author: z.string({
      required_error: 'Author Is Required !'
    }),
    price: z.number({
      required_error: 'Price is Required !'
    }),
    genre: z.string({
      required_error: 'Genre Is Required !'
    }),
    publicationDate: z.string({
      required_error: 'Publication Date Is Required !'
    }),
    categoryId: z.string({
      required_error: 'Category Id Is Required !'
    })
  })
});

const UpdateBookZodSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    author: z.string().optional(),
    price: z.number().optional(),
    genre: z.string().optional(),
    publicationDate: z.string().optional(),
    categoryId: z.string().optional()
  })
});

export const BookValidation = {
  CreateBookZodSchema,
  UpdateBookZodSchema
};
