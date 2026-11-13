import { eq } from "drizzle-orm";
import { db } from "@/drizzle";
import { messages } from "@/drizzle/schema";
import type { Mailbox } from "@/lib/mailbox";
import type { TopicMeta } from "@/lib/types";

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
              user: true,
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
      lastParticipant: {
        id: lastMessage.user.id,
        email: lastMessage.user.email,
        firstName: lastMessage.user.firstname,
        lastName: lastMessage.user.lastname,
        createdAt: lastMessage.user.createdAt.toISOString(),
      },
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
