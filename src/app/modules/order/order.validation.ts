import { z } from 'zod';

const CreateOrderZodSchema = z.object({
  body: z.object({
    orderedBooks: z
      .array(
        z.object({
          bookId: z.string().uuid(),
          quantity: z.number().int().positive()
        })
      )
      .nonempty()
  })
});

export const OrderValidation = {
  CreateOrderZodSchema
};
