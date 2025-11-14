"use server";

import { db } from "@/db";
import { CreateUser, sessions, users } from "@/db/schema";
import { registerSchema } from "@/schemas/register";
import { Cookie, password, randomUUIDv7 } from "bun";
import { redirect } from "next/navigation";

interface RegisterProps {
  createUser: CreateUser;
}

export async function register({ createUser }: RegisterProps) {
  registerSchema.parse(createUser);

  const existingUser = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.username, createUser.username),
  });

  if (existingUser) {
    throw new Error("Username already exists");
  }

  const hashPassword = await password.hash(createUser.password);

  const [user] = await db
    .insert(users)
    .values({
      ...createUser,
      password: hashPassword,
    })
    .returning();

  const token = randomUUIDv7();
  const twoDays = new Date(Date.now() + 1000 * 60 * 60 * 2); // 2 days

  new Cookie("session", token, {
    expires: twoDays,
  });

  await db.insert(sessions).values({
    userId: user.id,
    token,
    expiresAt: twoDays,
  });

  redirect("/chat");
}
