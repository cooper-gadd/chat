import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { SQL } from "bun";
import * as schema from "./schema";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";

config({ path: ".env" });

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  conn: SQL | undefined;
};

const conn = globalForDb.conn ?? new SQL(process.env.DATABASE_URL!);

if (process.env.NODE_ENV !== "production") {
  globalForDb.conn = conn;
}

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql, schema });
