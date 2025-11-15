"use server";

import { db } from "@/db";
import { cookies } from "next/headers";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session");

  if (!token) {
    console.error("No token found");
    return;
  }

  const session = await db.query.sessions.findFirst({
    where: (sessions, { eq }) => eq(sessions.token, token.value),
    columns: {
      userId: true,
    },
  });

  if (!session) {
    console.error("No session found");
    return;
  }

  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, session.userId),
    columns: {
      id: true,
      username: true,
      name: true,
    },
  });

  if (!user) {
    console.error("No user found");
    return;
  }

  return user;
}
