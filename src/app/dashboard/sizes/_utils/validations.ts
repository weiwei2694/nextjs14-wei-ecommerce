import { z } from 'zod';
import { getSize, isNameExist, isValueExist } from './actions';

export const saveSizeValidation = z.object({
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
})
  .refine(async ({ name }) => {
    const existingName = await isNameExist(name)

    return !Boolean(existingName);
  }, {
    message: 'Name already exist.',
    path: ['name'],
  })
  .refine(async ({ value }) => {
    const existingValue = await isValueExist(value);

    return !Boolean(existingValue);
  }, {
    message: 'Value already exist.',
    path: ['value']
  });

export const updateSizeValidation = z.object({
  id: z.string().uuid({ message: 'Invalid ID.' }),
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
})
  .refine(async ({ id, name }) => {
    const existingSize = await getSize({ id });
    if (existingSize!.name === name.toLowerCase()) return true;

    const existingName = await isNameExist(name)
    return !Boolean(existingName);
  }, {
    message: 'Name already exist.',
    path: ['name'],
  })
  .refine(async ({ id, value }) => {
    const existingSize = await getSize({ id });
    if (existingSize!.value === value.toUpperCase()) return true;

    const existingValue = await isValueExist(value);
    return !Boolean(existingValue);
  }, {
    message: 'Value already exist.',
    path: ['value']
  });