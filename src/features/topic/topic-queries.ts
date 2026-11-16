import "server-only";

import { and, eq, not } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import { db } from "@/drizzle";
import { messages, topicStates, type users } from "@/drizzle/schema";
import { TOPICS_DELAY_MS } from "@/lib/constants";
import type { Mailbox } from "@/lib/mailbox";
import { delay } from "@/lib/pure";
import type { Label, TopicMeta, TopicSummary, User } from "@/lib/types";
import { topicTags } from "./topic-cacheTags";

export const userColumns = {
  id: true,
  email: true,
  firstname: true,
  lastname: true,
  createdAt: true,
} as const;

export function toUser(
  user: Pick<typeof users.$inferSelect, keyof typeof userColumns>,
): User {
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstname,
    lastName: user.lastname,
    createdAt: user.createdAt.toISOString(),
  };
}

type TopicStatesWhere = NonNullable<
  Parameters<typeof db.query.topicStates.findMany>[0]
>["where"];

const mailboxFilters = {
  inbox: () => ({ archivized: false }),
  starred: () => ({ starred: true }),
  archive: () => ({ archivized: true }),
  sent: (userId) => ({ topic: { messages: { senderId: userId } } }),
} satisfies Record<Mailbox, (userId: number) => TopicStatesWhere>;

export async function getUserMailboxTopics(
  userId: number,
  mailbox: Mailbox,
): Promise<TopicMeta[]> {
  return getUserMailboxTopicsCached(userId, mailbox);
}

async function getUserMailboxTopicsCached(
  userId: number,
  mailbox: Mailbox,
): Promise<TopicMeta[]> {
  "use cache";
  cacheLife("max");
  cacheTag(topicTags.list(String(userId)));

  return getUserTopics({ userId, ...mailboxFilters[mailbox](userId) });
}

export async function getUserLabelTopics(
  userId: number,
  name: string,
): Promise<TopicMeta[]> {
  return getUserLabelTopicsCached(userId, name);
}

async function getUserLabelTopicsCached(
  userId: number,
  name: string,
): Promise<TopicMeta[]> {
  "use cache";
  cacheLife("max");
  cacheTag(topicTags.list(String(userId)));

  return getUserTopics({ userId, label: { name: name } });
}

async function getUserTopics(where: TopicStatesWhere): Promise<TopicMeta[]> {
  await delay(TOPICS_DELAY_MS);

  const states = await db.query.topicStates.findMany({
    where,
    columns: { archivized: true, starred: true, seen: true },
    with: {
      label: { columns: { id: true, name: true, color: true } },
      topic: {
        columns: { id: true, subject: true },
        extras: {
          messageCount: (t) => db.$count(messages, eq(messages.topicId, t.id)),
        },
        with: {
          participants: {
            columns: { firstname: true },
            orderBy: { firstname: "asc" },
          },
          messages: {
            columns: { sentAt: true },
            orderBy: { sentAt: "desc" },
            limit: 1,
            with: {
              user: { columns: userColumns },
            },
          },
        },
      },
    },
    orderBy: { topic: { messages: { sentAt: "desc(max)" } } },
  });

  return states.map(({ topic, label, seen, archivized, starred }) => {
    const [lastMessage] = topic.messages;

    return {
      id: topic.id,
      subject: topic.subject,
      lastParticipant: toUser(lastMessage.user),
      participants: topic.participants.map((p) => p.firstname),
      messageCount: topic.messageCount,
      lastMessageAt: lastMessage.sentAt.toISOString(),
      label: label
        ? { id: String(label.id), name: label.name, color: label.color }
        : null,
      read: seen,
      starred,
      archived: archivized,
    };
  });
}

export async function getUserLabels(userId: number): Promise<Label[]> {
  return getUserLabelsCached(userId);
}

async function getUserLabelsCached(userId: number): Promise<Label[]> {
  "use cache";
  cacheLife("max");
  cacheTag(topicTags.labels(String(userId)));

  await delay(TOPICS_DELAY_MS);

  const labels = await db.query.labels.findMany({
    where: { userId },
    columns: { id: true, name: true, color: true },
  });
  return labels.map((label) => ({
    id: String(label.id),
    name: label.name,
    color: label.color,
  }));
}

export async function getTopicSummary(
  userId: number,
  topicId: number,
): Promise<TopicSummary> {
  return getTopicSummaryCached(userId, topicId);
}

async function getTopicSummaryCached(
  userId: number,
  topicId: number,
): Promise<TopicSummary> {
  "use cache";
  cacheLife("max");
  cacheTag(topicTags.detail(String(topicId)));

  await delay(TOPICS_DELAY_MS);

  const [topic] = await db.query.topics.findMany({
    where: { id: topicId },
    columns: { id: true, subject: true },
    extras: {
      messageCount: (t) => db.$count(messages, eq(messages.topicId, t.id)),
    },
    with: {
      topicStates: {
        where: { userId },
        columns: { seen: true, starred: true, archivized: true },
        with: {
          label: { columns: { id: true, name: true, color: true } },
        },
      },
      messages: {
        columns: { id: true, sentAt: true },
        orderBy: { sentAt: "desc" },
        limit: 1,
        with: {
          user: { columns: userColumns },
          users: {
            columns: { firstname: true },
            orderBy: { firstname: "asc" },
          },
        },
      },
    },
  });

  const [{ label, seen, starred, archivized }] = topic.topicStates;
  const [latestMessage] = topic.messages;

  return {
    id: String(topic.id),
    subject: topic.subject,
    label: label
      ? { id: String(label.id), name: label.name, color: label.color }
      : null,
    read: seen,
    starred,
    archived: archivized,
    messageCount: topic.messageCount,
    latest: {
      id: String(latestMessage.id),
      creator: toUser(latestMessage.user),
      participants: latestMessage.users.map((recipient) => recipient.firstname),
      createdAt: latestMessage.sentAt.toISOString(),
    },
  };
}

type TopicState = typeof topicStates.$inferSelect;

type TopicStateFlagColumn = {
  [K in keyof TopicState]: TopicState[K] extends boolean ? K : never;
}[keyof TopicState];

const topicStateFlags = {
  read: "seen",
  starred: "starred",
  archived: "archivized",
} as const satisfies Record<string, TopicStateFlagColumn>;

export const topicStateKeys = Object.keys(topicStateFlags) as TopicStateKeys[];

export type TopicStateKeys = keyof typeof topicStateFlags;

export async function toggleTopicState(
  userId: number,
  topicId: number,
  flag: keyof typeof topicStateFlags,
): Promise<void> {
  await delay(500);
  const column = topicStateFlags[flag];

  await db
    .update(topicStates)
    .set({ [column]: not(topicStates[column]) })
    .where(
      and(eq(topicStates.userId, userId), eq(topicStates.topicId, topicId)),
    );
}
