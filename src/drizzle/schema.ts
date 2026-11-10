import { sql } from "drizzle-orm";
import {
  bigint,
  boolean,
  foreignKey,
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp,
  unique,
  varchar,
} from "drizzle-orm/pg-core";

export const labels = pgTable(
  "labels",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userId: bigint("user_id", { mode: "number" }).notNull(),
    name: varchar({ length: 50 }).notNull(),
    color: varchar({ length: 7 }).default("#CCCCCC").notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
      name: "fk_label_user",
    }).onDelete("cascade"),
    unique("uk_user_label_name").on(table.userId, table.name),
  ],
);

export const messageRecipients = pgTable(
  "message_recipients",
  {
    messageId: bigint("message_id", { mode: "number" }).notNull(),
    recipientId: bigint("recipient_id", { mode: "number" }).notNull(),
  },
  (table) => [
    primaryKey({
      columns: [table.messageId, table.recipientId],
      name: "message_recipients_pkey",
    }),
    foreignKey({
      columns: [table.messageId],
      foreignColumns: [messages.id],
      name: "fk_msg_rec_message",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.recipientId],
      foreignColumns: [users.id],
      name: "fk_msg_rec_user",
    }),
  ],
);

export const messages = pgTable(
  "messages",
  {
    id: bigint({ mode: "number" })
      .primaryKey()
      .generatedAlwaysAsIdentity({ maxValue: 9223372036854776000 }),
    topicId: bigint("topic_id", { mode: "number" }).notNull(),
    senderId: bigint("sender_id", { mode: "number" }).notNull(),
    content: text().notNull(),
    sentAt: timestamp("sent_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.senderId],
      foreignColumns: [users.id],
      name: "fk_message_sender",
    }),
    foreignKey({
      columns: [table.topicId],
      foreignColumns: [topics.id],
      name: "fk_message_topic",
    }).onDelete("cascade"),
  ],
);

export const topicLabels = pgTable(
  "topic_labels",
  {
    topicId: bigint("topic_id", { mode: "number" }).notNull(),
    labelId: integer("label_id").notNull(),
  },
  (table) => [
    primaryKey({
      columns: [table.topicId, table.labelId],
      name: "topic_labels_pkey",
    }),
    foreignKey({
      columns: [table.labelId],
      foreignColumns: [labels.id],
      name: "fk_tl_label",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.topicId],
      foreignColumns: [topics.id],
      name: "fk_tl_topic",
    }).onDelete("cascade"),
  ],
);

export const topicStates = pgTable(
  "topic_states",
  {
    userId: bigint("user_id", { mode: "number" }).notNull(),
    topicId: bigint("topic_id", { mode: "number" }).notNull(),
    seen: boolean().default(false).notNull(),
    archivized: boolean().default(false).notNull(),
  },
  (table) => [
    primaryKey({
      columns: [table.userId, table.topicId],
      name: "topic_states_pkey",
    }),
    foreignKey({
      columns: [table.topicId],
      foreignColumns: [topics.id],
      name: "fk_state_topic",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
      name: "fk_state_user",
    }).onDelete("cascade"),
  ],
);

export const topics = pgTable("topics", {
  id: bigint({ mode: "number" })
    .primaryKey()
    .generatedAlwaysAsIdentity({ maxValue: 9223372036854776000 }),
  subject: varchar({ length: 255 }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const users = pgTable(
  "users",
  {
    id: bigint({ mode: "number" })
      .primaryKey()
      .generatedAlwaysAsIdentity({ maxValue: 9223372036854776000 }),
    email: varchar({ length: 255 }).notNull(),
    firstname: varchar({ length: 100 }).notNull(),
    lastname: varchar({ length: 100 }).notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [unique("users_email_key").on(table.email)],
);
