import { eq } from "drizzle-orm/sql/expressions/index";
import { sql } from "drizzle-orm/sql/sql";
import { db } from "@/drizzle";
import {
  labels,
  messageRecipients,
  messages,
  topicLabels,
  topicStates,
} from "@/drizzle/schema";

export async function getMessages(userId: number) {
  // wszytskie labele usera
  const label_ids = await db
    .select()
    .from(labels)
    .where(eq(labels.userId, userId));

  console.log("label_ids", label_ids);

  // wszytskie topic state usera
  const topic_states = await db
    .select()
    .from(topicStates)
    .where(eq(topicStates.userId, userId));

  const messages_for_topic = await db
    .select({
      topicId: messages.topicId,
      count: sql<number>`cast(count(${messages.id}) as int)`,
    })
    .from(messages)
    .groupBy(messages.topicId);

  console.log("messages_for_topic", messages_for_topic);

  //console.log("topic_states", topic_states);

  // przejscie po wszystkich topicach usera
  // wylistiowanie labeli do topica
  // const labels_for_topic = await db
  //   .select()
  //   .from(topicLabels)
  //   .where(eq(topicLabels.topicId, topic_state.topicId));
  // //join z message recipients
  // const messages_with_recipients = await db
  //   .select()
  //   .from(messages)
  //   .leftJoin(messageRecipients, eq(messages.id, messageRecipients.messageId))
  //   .where(eq(messages.topicId, topic_state.topicId));
  // console.log("messages_with_recipients", messages_with_recipients.length);
}
