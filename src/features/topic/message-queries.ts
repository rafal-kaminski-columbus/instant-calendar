import { db } from "@/drizzle";
import { TOPICS_DELAY_MS } from "@/lib/constants";
import { delay } from "@/lib/pure";
import type { Message } from "@/lib/types";
import { toUser, userColumns } from "./topic-queries";

export async function getLatestMessageInTopic(
  topicId: number,
): Promise<Message | undefined> {
  await delay(TOPICS_DELAY_MS);

  const latestMessage = await db.query.messages.findFirst({
    where: { topicId },
    columns: { id: true, content: true, sentAt: true },
    with: {
      user: { columns: userColumns },
      users: { columns: { firstname: true }, orderBy: { firstname: "asc" } },
    },
    orderBy: { sentAt: "desc" },
  });

  if (!latestMessage) {
    return undefined;
  }

  return {
    id: String(latestMessage.id),
    creator: toUser(latestMessage.user),
    participants: latestMessage.users.map((recipient) => recipient.firstname),
    subject: latestMessage.content,
    createdAt: latestMessage.sentAt.toISOString(),
  };
}

export async function getMessagesInTopic(topicId: number): Promise<Message[]> {
  await delay(TOPICS_DELAY_MS);

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
