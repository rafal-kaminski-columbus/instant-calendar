import { eq } from "drizzle-orm";
import { db } from "@/drizzle";
import { messages, type users } from "@/drizzle/schema";
import type { Mailbox } from "@/lib/mailbox";
import type { Label, Message, TopicMeta, User } from "@/lib/types";

const userColumns = {
  id: true,
  email: true,
  firstname: true,
  lastname: true,
  createdAt: true,
} as const;

function toUser(
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

export function getUserMailboxTopics(
  userId: number,
  mailbox: Mailbox,
): Promise<TopicMeta[]> {
  return getUserTopics({ userId, ...mailboxFilters[mailbox](userId) });
}

export function getUserLabelTopics(
  userId: number,
  labelId: number,
): Promise<TopicMeta[]> {
  return getUserTopics({ userId, labelId });
}

async function getUserTopics(where: TopicStatesWhere): Promise<TopicMeta[]> {
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

export async function getMessagesInTopic(topicId: number): Promise<Message[]> {
  const topicMessages = await db.query.messages.findMany({
    where: { topicId },
    columns: { id: true, content: true, sentAt: true },
    with: {
      user: { columns: userColumns },
      users: {
        columns: { firstname: true },
        orderBy: { firstname: "asc" },
      },
    },
    orderBy: { sentAt: "desc" },
  });

  return topicMessages.map((message) => ({
    id: String(message.id),
    creator: toUser(message.user),
    participants: message.users.map((recipient) => recipient.firstname),
    subject: message.content,
    createdAt: message.sentAt.toISOString(),
  }));
}
