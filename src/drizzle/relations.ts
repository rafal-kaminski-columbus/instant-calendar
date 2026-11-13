import { defineRelations } from "drizzle-orm";
import * as schema from "./schema";

export const relations = defineRelations(schema, (r) => ({
  labels: {
    user: r.one.users({
      from: r.labels.userId,
      to: r.users.id,
    }),
    topicStates: r.many.topicStates(),
  },
  users: {
    labels: r.many.labels(),
    messagesViaMessageRecipients: r.many.messages({
      alias: "messages_id_users_id_via_messageRecipients",
    }),
    messageRecipients: r.many.messageRecipients(),
    topics: r.many.topics({
      from: r.users.id.through(r.messages.senderId),
      to: r.topics.id.through(r.messages.topicId),
    }),
    messagesSenderId: r.many.messages({
      alias: "messages_senderId_users_id",
    }),
    topicStates: r.many.topicStates(),
  },
  messages: {
    users: r.many.users({
      from: r.messages.id.through(r.messageRecipients.messageId),
      to: r.users.id.through(r.messageRecipients.recipientId),
      alias: "messages_id_users_id_via_messageRecipients",
    }),
    messageRecipients: r.many.messageRecipients(),
    user: r.one.users({
      from: r.messages.senderId,
      to: r.users.id,
      alias: "messages_senderId_users_id",
      optional: false,
    }),
    topic: r.one.topics({
      from: r.messages.topicId,
      to: r.topics.id,
    }),
  },
  messageRecipients: {
    message: r.one.messages({
      from: r.messageRecipients.messageId,
      to: r.messages.id,
    }),
    user: r.one.users({
      from: r.messageRecipients.recipientId,
      to: r.users.id,
    }),
  },
  topics: {
    users: r.many.users(),
    participants: r.many.users({
      from: r.topics.id.through(r.topicStates.topicId),
      to: r.users.id.through(r.topicStates.userId),
      alias: "topics_participants_via_topicStates",
    }),
    messages: r.many.messages(),
    topicStates: r.many.topicStates(),
  },
  topicStates: {
    label: r.one.labels({
      from: [r.topicStates.labelId, r.topicStates.userId],
      to: [r.labels.id, r.labels.userId],
    }),
    topic: r.one.topics({
      from: r.topicStates.topicId,
      to: r.topics.id,
      optional: false,
    }),
    user: r.one.users({
      from: r.topicStates.userId,
      to: r.users.id,
    }),
  },
}));
