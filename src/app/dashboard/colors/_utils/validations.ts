import { z } from 'zod';

import { isNameExist, isColorExist, getColor } from './actions';

export const saveColorValidation = z.object({
  name: z
    .string()
    .min(3, {
      message: 'Name must be at least 3 characters.',
    })
    .max(100, {
      message: 'Name must be less than 100 characters.',
    }),
  color: z
    .string()
    .min(3, {
      message: 'Color must be at least 3 characters.',
    })
    .max(10, {
      message: 'Color must be less than 10 characters.',
    }),
})
  .refine(
    async ({ name }) => {
      const isExist = await isNameExist(name.toLowerCase());
      return !isExist;
    },
    {
      message: "Name already exists.",
      path: ["name"],
    }
  ).refine(
    async ({ color }) => {
      const isExist = await isColorExist(color.toLowerCase());
      return !isExist;
    },
    {
      message: "Color already exists.",
      path: ["color"],
    }
  ).refine(
    async ({ color }) => {
      return CSS.supports('color', color);
    },
    {
      message: "Color is not supported.",
      path: ["color"],
    }
  );

export const updateColorValidation = z.object({
  id: z.string().uuid({ message: 'Invalid ID.' }),
  name: z
    .string()
    .min(3, {
      message: 'Name must be at least 3 characters.',
    })
    .max(100, {
      message: 'Name must be less than 100 characters.',
    }),
  color: z
    .string()
    .min(3, {
      message: 'Color must be at least 3 characters.',
    })
    .max(10, {
      message: 'Color must be less than 10 characters.',
    }),
})
  .refine(
    async ({ id, name }) => {
      const existingColor = await getColor({ id });
      // just tell typescript its name exists, using "!"
      if (existingColor!.name === name) return true;

      const isExist = await isNameExist(name.toLowerCase());
      return !isExist;
    },
    {
      message: "Name already exists.",
      path: ["name"],
    }
  ).refine(
    async ({ id, color }) => {
      const existingColor = await getColor({ id });
      // just tell typescript its color exists, using "!"
      if (existingColor!.color === color) return true;

      const isExist = await isColorExist(color.toLowerCase());
      return !isExist;
    },
    {
      message: "Color already exists.",
      path: ["color"],
    }
  ).refine(
    async ({ color }) => {
      return CSS.supports('color', color);
    },
    {
      message: "Color is not supported.",
      path: ["color"],
    }
  );