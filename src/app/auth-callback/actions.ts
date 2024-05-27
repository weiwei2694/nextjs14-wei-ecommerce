'use server';

import { db } from "@/db";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const getAuthStatus = async () => {
  const { getUser } = getKindeServerSession()
  const user = await getUser();
  if (!user?.id || !user?.email) {
    return { success: false }
  }

  const existingUser = await db.user.findFirst({
    where: {
      id: user.id,
      email: user.email
    }
  })
  if (!existingUser) {
    await db.user.create({
      data: {
        id: user.id,
        email: user.email,
        name: `${user.given_name} ${user.family_name || ""}`
      }
    });
  }

  return { success: true };
}