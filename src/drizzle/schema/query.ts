import { eq } from "drizzle-orm";
import { db } from "@/drizzle";
import { messages } from "@/drizzle/schema";

export async function getUserInboxTopics(userId: number) {
  const states = await db.query.topicStates.findMany({
    where: { userId },
    columns: { archivized: true, starred: true },
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
        },
      },
    },
    orderBy: { topic: { messages: { sentAt: "desc(max)" } } },
  });

  return states.map(({ topic, label, archivized, starred }) => ({
    id: topic.id,
    subject: topic.subject,
    participants: topic.participants.map((p) => p.firstname),
    messageCount: topic.messageCount,
    archived: archivized,
    starred,
    label,
  }));
}
