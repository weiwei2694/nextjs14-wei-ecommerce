import { z } from 'zod';
import { isNameExist } from './actions';

export const saveCategoryValidation = z.object({
  name: z
    .string()
    .min(3, {
      message: 'Name must be at least 3 characters.',
    })
    .max(100, {
      message: 'Name must be less than 100 characters.',
    }),
}).refine(async ({ name }) => {
  const existingName = await isNameExist(name);
  return !Boolean(existingName);
}, {
  message: 'Name already exist.',
  path: ['name']
});