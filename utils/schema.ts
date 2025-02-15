import { index, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const documentsTable = pgTable('documents', {
  id: uuid().defaultRandom().primaryKey(),
  title: text().notNull(),
  initialContent: text(),
  ownerId: text().notNull(),
  roomId: text(),
  organizationId: text(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().$onUpdate(() => new Date()),
}, t => [
  index('by_owner_id').on(t.ownerId),
  index('by_organization_id').on(t.organizationId),
])

export type InsertDocument = typeof documentsTable.$inferInsert
export type SelectDocument = typeof documentsTable.$inferSelect
export type UpdateDocument = Partial<typeof documentsTable.$inferInsert>
