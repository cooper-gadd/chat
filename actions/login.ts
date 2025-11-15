"use server";

import { db } from "@/db";
import { sessions } from "@/db/schema";
import { loginSchema } from "@/schemas/login";
import { password, randomUUIDv7 } from "bun";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login({
  username,
  password: plainPassword,
}: {
  username: string;
  password: string;
}) {
  loginSchema.parse({
    username,
    plainPassword,
  });

  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.username, username),
  });

  if (!user) {
    return { success: false, error: "Invalid username" };
  }

  const isValidPassword = await password.verify(plainPassword, user.password);

  if (!isValidPassword) {
    return { success: false, error: "Invalid password" };
  }

  await db.delete(sessions).where(eq(sessions.userId, user.id));

  const token = randomUUIDv7();
  const twoDays = new Date(Date.now() + 1000 * 60 * 60 * 2); // 2 days
  const cookieStore = await cookies();

  cookieStore.set("session", token, {
    expires: twoDays,
  });

  await db.insert(sessions).values({
    userId: user.id,
    token,
    expiresAt: twoDays,
  });

  redirect("/");
}
