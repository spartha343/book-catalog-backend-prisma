'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.BookValidation = void 0;
const zod_1 = require('zod');
const CreateBookZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    title: zod_1.z.string({
      required_error: 'Title Is Required !'
    }),
    author: zod_1.z.string({
      required_error: 'Author Is Required !'
    }),
    price: zod_1.z.number({
      required_error: 'Price is Required !'
    }),
    genre: zod_1.z.string({
      required_error: 'Genre Is Required !'
    }),
    publicationDate: zod_1.z.string({
      required_error: 'Publication Date Is Required !'
    }),
    categoryId: zod_1.z.string({
      required_error: 'Category Id Is Required !'
    })
  })
});
const UpdateBookZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    title: zod_1.z.string().optional(),
    author: zod_1.z.string().optional(),
    price: zod_1.z.number().optional(),
    genre: zod_1.z.string().optional(),
    publicationDate: zod_1.z.string().optional(),
    categoryId: zod_1.z.string().optional()
  })
});
exports.BookValidation = {
  CreateBookZodSchema,
  UpdateBookZodSchema
};
