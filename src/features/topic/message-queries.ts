import "server-only";

import { cacheLife, cacheTag } from "next/cache";
import { db } from "@/drizzle";
import { delay } from "@/lib/pure";
import type { Message } from "@/lib/types";
import { topicTags } from "./topic-cacheTags";
import { toUser, userColumns } from "./topic-queries";

export async function getLatestMessageInTopic(
  topicId: number,
): Promise<Message | undefined> {
  // ! tutaj powinno byc sprawdzenie usera
  return getLatestMessageInTopicCached(topicId);
}

async function getLatestMessageInTopicCached(
  topicId: number,
): Promise<Message | undefined> {
  "use cache";
  cacheLife("max");
  cacheTag(topicTags.detail(String(topicId)));

  await delay(1000);

  const latestMessage = await db.query.messages.findFirst({
    where: { topicId },
    columns: { id: true, content: true, sentAt: true },
    with: {
      user: { columns: userColumns },
      users: { columns: { firstname: true }, orderBy: { firstname: "asc" } },
    },
    orderBy: { sentAt: "desc", id: "desc" },
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
  // ! tutaj powinno byc sprawdzenie usera
  return getMessagesInTopicCached(topicId);
}

export async function getMessagesInTopicCached(
  topicId: number,
): Promise<Message[]> {
  "use cache";
  cacheLife("max");
  cacheTag(topicTags.detail(String(topicId)));

  await delay(2000);

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
    orderBy: { sentAt: "desc", id: "desc" },
    offset: 1,
  });

  return topicMessages.map((message) => ({
    id: String(message.id),
    creator: toUser(message.user),
    participants: message.users.map((recipient) => recipient.firstname),
    subject: message.content,
    createdAt: message.sentAt.toISOString(),
  }));
}
