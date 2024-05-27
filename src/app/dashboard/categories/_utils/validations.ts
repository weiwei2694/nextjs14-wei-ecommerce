import { z } from 'zod';
import { getCategory, isNameExist } from './actions';

export const saveCategoryValidation = z.object({
  name: z
    .string()
    .min(3, {
      message: 'Name must be at least 3 characters.',
    })
    .max(100, {
      message: 'Name must be less than 100 characters.',
    }),
  title: z.string()
    .min(1, {
      message: 'Title is required.'
    })
    .max(50, {
      message: 'Title mus be less than 50 characters.'
    })
}).refine(async ({ name }) => {
  const existingName = await isNameExist(name);
  return !Boolean(existingName);
}, {
  message: 'Name already exist.',
  path: ['name']
});

export const updateCategoryValidation = z.object({
  id: z.string().uuid({ message: 'Invalid ID.' }),
  name: z
    .string()
    .min(3, {
      message: 'Name must be at least 3 characters.',
    })
    .max(100, {
      message: 'Name must be less than 100 characters.',
    }),
  title: z.string()
    .min(1, {
      message: 'Title is required.'
    })
    .max(50, {
      message: 'Title mus be less than 50 characters.'
    })
}).refine(async ({ id, name }) => {
  const existingCategory = await getCategory({ id });
  if (existingCategory!.name === name) return true;

  const existingName = await isNameExist(name);
  return !Boolean(existingName);
}, {
  message: 'Name already exist.',
  path: ['name']
});