import { and, asc, count, eq, inArray, max } from "drizzle-orm";
import { db } from "@/drizzle";
import {
  labels,
  messageRecipients,
  messages,
  topicLabels,
  topicStates,
  topics,
  users,
} from "@/drizzle/schema";

export async function getUserTopics(userId: number) {
  return db
    .select({
      id: topics.id,
      subject: topics.subject,
      seen: topicStates.seen,
      archivized: topicStates.archivized,
    })
    .from(topicStates)
    .innerJoin(topics, eq(topics.id, topicStates.topicId))
    .where(eq(topicStates.userId, userId));
}

export async function getMessageStatsByTopicIds(topicIds: number[]) {
  return db
    .select({
      topicId: messages.topicId,
      messageCount: count(),
      lastMessageAt: max(messages.sentAt),
    })
    .from(messages)
    .where(inArray(messages.topicId, topicIds))
    .groupBy(messages.topicId);
}

export async function getSendersByTopicIds(topicIds: number[]) {
  return db
    .selectDistinct({
      topicId: messages.topicId,
      userId: messages.senderId,
    })
    .from(messages)
    .where(inArray(messages.topicId, topicIds));
}

export async function getRecipientsByTopicIds(topicIds: number[]) {
  return db
    .selectDistinct({
      topicId: messages.topicId,
      userId: messageRecipients.recipientId,
    })
    .from(messageRecipients)
    .innerJoin(messages, eq(messages.id, messageRecipients.messageId))
    .where(inArray(messages.topicId, topicIds));
}

export async function getUsersByIds(userIds: number[]) {
  return db.select().from(users).where(inArray(users.id, userIds));
}

export async function getUserLabelsByTopicIds(
  userId: number,
  topicIds: number[],
) {
  return db
    .select({
      topicId: topicLabels.topicId,
      id: labels.id,
      name: labels.name,
      color: labels.color,
    })
    .from(topicLabels)
    .innerJoin(labels, eq(labels.id, topicLabels.labelId))
    .where(
      and(eq(labels.userId, userId), inArray(topicLabels.topicId, topicIds)),
    )
    .orderBy(asc(labels.name));
}
