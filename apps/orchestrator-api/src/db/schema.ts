import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  preferredLanguage: text('preferred_language').default('en').notNull(),
});

export const conversations = sqliteTable('conversations', {
  id: text('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  startedAt: integer('started_at').notNull(),
});

export const messages = sqliteTable('messages', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  conversationId: text('conversation_id').references(() => conversations.id),
  role: text('role').notNull(),
  text: text('text').notNull(),
  createdAt: integer('created_at').notNull(),
});

export const tasks = sqliteTable('tasks', {
  id: text('id').primaryKey(),
  conversationId: text('conversation_id').references(() => conversations.id),
  intent: text('intent').notNull(),
  status: text('status').notNull(),
  createdAt: integer('created_at').notNull(),
});
