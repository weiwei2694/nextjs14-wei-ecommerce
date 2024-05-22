import { z } from 'zod';

export const sizeValidation = z.object({
  name: z
    .string()
    .min(3, {
      message: 'Name must be at least 3 characters.',
    })
    .max(100, {
      message: 'Name must be less than 100 characters.',
    }),
  value: z
    .string()
    .min(1, {
      message: 'Value must be at least 1 characters.',
    })
    .max(10, {
      message: 'Value must be less than 10 characters.',
    }),
});