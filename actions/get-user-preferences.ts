"use server";

import { db } from "@/db";
import { ThemeColor } from "@/db/schema";
import { getCurrentUser } from "./get-current-user";

export async function getUserPreferences(): Promise<{ themeColor: ThemeColor }> {
  const user = await getCurrentUser();

  const prefs = await db.query.userPreferences.findFirst({
    where: (userPreferences, { eq }) => eq(userPreferences.userId, user.id),
  });

  return {
    themeColor: prefs?.themeColor ?? "default",
  };
}
