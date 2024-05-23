import { db } from "@/db";

import { createUploadthing, type FileRouter } from "uploadthing/next";

import { z } from 'zod';

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 99999 } })
    .input(z.object({ productId: z.string().uuid() }))
    .middleware(async ({ input }) => ({ input }))
    .onUploadComplete(async ({ metadata: { input: { productId } }, file }) => {
      console.info(file.url)
      await db.image.create({ data: { productId, url: file.url } });

      return { success: true };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;