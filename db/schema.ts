import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import {
  index,
  integer,
  pgEnum,
  pgTableCreator,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

const pgTable = pgTableCreator((name) => `chat_${name}`);

export const users = pgTable(
  "user",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    name: varchar("name", { length: 256 }).notNull(),
    username: varchar("username", { length: 256 }).unique().notNull(),
    password: varchar("password", { length: 256 }).notNull(),
  },
  (t) => [
    index("user_username_index").on(t.username),
    index("user_password_index").on(t.password),
  ],
);

export const userRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
  threads: many(threads),
}));

export type CreateUser = InferInsertModel<typeof users>;
export type User = InferSelectModel<typeof users>;
export type UpdateUser = Partial<CreateUser>;

export const sessions = pgTable(
  "session",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    userId: integer("user_id")
      .references(() => users.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      })
      .notNull(),
    token: varchar("token", { length: 250 }).notNull(),
    expiresAt: timestamp("expires_at").notNull(),
  },
  (t) => [index("session_token_index").on(t.token)],
);

export const sessionRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export type CreateSession = InferInsertModel<typeof sessions>;
export type Session = InferSelectModel<typeof sessions>;
export type UpdateSession = Partial<CreateSession>;

export const threads = pgTable(
  "thread",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    userId: integer("user_id")
      .references(() => users.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      })
      .notNull(),
    parentThreadId: integer("parent_thread_id"), //for branching off referencing
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => [
    index("thread_id_index").on(t.id),
    index("thread_user_id_index").on(t.userId),
  ],
);

export const threadRelations = relations(threads, ({ one, many }) => ({
  user: one(users, {
    fields: [threads.userId],
    references: [users.id],
  }),
  messages: many(messages),
}));

export type CreateThread = InferInsertModel<typeof threads>;
export type Thread = InferSelectModel<typeof threads>;
export type UpdateThread = Partial<CreateThread>;

export const roleEnum = pgEnum("role", ["user", "assistant"]);

export const messages = pgTable(
  "message",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    threadId: integer("thread_id").references(() => threads.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
    role: roleEnum("role").notNull(),
    content: text("content").notNull(),
    sequence: integer("sequence").default(0).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => [
    index("message_id_index").on(t.id),
    index("message_id_sequence").on(t.sequence),
  ],
);

export const messageRelations = relations(messages, ({ one }) => ({
  threads: one(threads, {
    fields: [messages.threadId],
    references: [threads.id],
  }),
}));

export type CreateMessage = InferInsertModel<typeof messages>;
export type Message = InferSelectModel<typeof messages>;
export type UpdateMessage = Partial<CreateMessage>;
