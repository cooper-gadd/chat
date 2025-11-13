import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import "./compression-polyfill";

export default defineConfig({
  out: "./drizzle",
  schema: "./db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  tablesFilter: ["chat_"],
});
