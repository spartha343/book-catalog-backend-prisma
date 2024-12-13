'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.CategoryValidation = void 0;
const zod_1 = require('zod');
const CreateCategoryZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    title: zod_1.z.string({
      required_error: 'Title Is Required !'
    })
  })
});
const UpdateCategoryZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    title: zod_1.z.string({
      required_error: 'Title Is Required !'
    })
  })
});
exports.CategoryValidation = {
  CreateCategoryZodSchema,
  UpdateCategoryZodSchema
};
