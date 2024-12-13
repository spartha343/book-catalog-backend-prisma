'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.OrderValidation = void 0;
const zod_1 = require('zod');
const CreateOrderZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    orderedBooks: zod_1.z
      .array(
        zod_1.z.object({
          bookId: zod_1.z.string().uuid(),
          quantity: zod_1.z.number().int().positive()
        })
      )
      .nonempty()
  })
});
exports.OrderValidation = {
  CreateOrderZodSchema
};
