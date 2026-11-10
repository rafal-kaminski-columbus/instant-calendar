import { defineRelations } from "drizzle-orm";
import * as schema from "./schema";

export const relations = defineRelations(schema, (r) => ({
  labels: {
    user: r.one.users({
      from: r.labels.userId,
      to: r.users.id,
    }),
    topics: r.many.topics({
      from: r.labels.id.through(r.topicLabels.labelId),
      to: r.topics.id.through(r.topicLabels.topicId),
    }),
    topicLabels: r.many.topicLabels(),
  },
  users: {
    labels: r.many.labels(),
    messagesViaMessageRecipients: r.many.messages({
      alias: "messages_id_users_id_via_messageRecipients",
    }),
    messageRecipients: r.many.messageRecipients(),
    topicsViaMessages: r.many.topics({
      from: r.users.id.through(r.messages.senderId),
      to: r.topics.id.through(r.messages.topicId),
      alias: "users_id_topics_id_via_messages",
    }),
    messagesSenderId: r.many.messages({
      alias: "messages_senderId_users_id",
    }),
    topicsViaTopicStates: r.many.topics({
      alias: "topics_id_users_id_via_topicStates",
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
    usersViaMessages: r.many.users({
      alias: "users_id_topics_id_via_messages",
    }),
    messages: r.many.messages(),
    labels: r.many.labels(),
    topicLabels: r.many.topicLabels(),
    usersViaTopicStates: r.many.users({
      from: r.topics.id.through(r.topicStates.topicId),
      to: r.users.id.through(r.topicStates.userId),
      alias: "topics_id_users_id_via_topicStates",
    }),
    topicStates: r.many.topicStates(),
  },
  topicLabels: {
    label: r.one.labels({
      from: r.topicLabels.labelId,
      to: r.labels.id,
    }),
    topic: r.one.topics({
      from: r.topicLabels.topicId,
      to: r.topics.id,
    }),
  },
  topicStates: {
    topic: r.one.topics({
      from: r.topicStates.topicId,
      to: r.topics.id,
    }),
    user: r.one.users({
      from: r.topicStates.userId,
      to: r.users.id,
    }),
  },
}));
