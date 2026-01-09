"use server";

import { db } from "@/db";
import { userPreferences, ThemeColor } from "@/db/schema";
import { getCurrentUser } from "./get-current-user";
import { eq } from "drizzle-orm";

export async function updateThemeColor(themeColor: ThemeColor) {
  const user = await getCurrentUser();

  const existingPrefs = await db.query.userPreferences.findFirst({
    where: (prefs, { eq }) => eq(prefs.userId, user.id),
  });

  if (existingPrefs) {
    await db
      .update(userPreferences)
      .set({ themeColor, updatedAt: new Date() })
      .where(eq(userPreferences.userId, user.id));
  } else {
    await db.insert(userPreferences).values({
      userId: user.id,
      themeColor,
    });
  }

  return { success: true, themeColor };
}
