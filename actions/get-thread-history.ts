"use server";

import { db } from "@/db";
import { sql } from "drizzle-orm";

export interface ThreadHistory {
  id: number;
  title: string;
}

export async function getThreadHistory({ threadId }: { threadId: number }) {
  const statement = sql<ThreadHistory>`
    WITH RECURSIVE history AS (
          SELECT id, title, parent_thread_id
          FROM chat_thread
          WHERE id = ${threadId}
          UNION ALL
          SELECT t.id, t.title, t.parent_thread_id
          FROM chat_thread t
          INNER JOIN history a ON t.id = a.parent_thread_id
        )
        SELECT id, title FROM history
        ORDER BY id ASC;
    `;

  const res = await db.execute(statement);

  const history: ThreadHistory[] = res.map((row) => ({
    id: row.id as number,
    title: row.title as string,
  }));

  return history;
}
