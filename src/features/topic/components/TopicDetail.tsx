import { notFound } from "next/navigation";
import { getMessagesInTopic, getTopicSummary } from "@/drizzle/schema/query";
import { currentUser } from "@/lib/current-user";
import type { TopicSummary } from "@/lib/types";
import { ReplyForm } from "./ReplyForm";
import { TopicHeader } from "./TopicHeader";
import { TopicLatestMessage } from "./TopicLatestMessage";
import { TopicMessages } from "./TopicMessages";
import { TopicToolbar } from "./TopicToolbar";

interface TopicDetailProps {
  topicId: string;
  backHref: string;
}

export async function TopicDetail({ topicId, backHref }: TopicDetailProps) {
  const [topic, topicMessages] = await Promise.all([
    getTopicSummary(currentUser.id, Number(topicId)),
    getMessagesInTopic(Number(topicId)),
  ]);

  if (!topic || topicMessages.length === 0) {
    notFound();
  }

  const [latestMessage, ...earlierMessages] = topicMessages;

  const summary: TopicSummary = {
    id: String(topic.id),
    subject: topic.subject,
    label: topic.label,
    read: topic.read,
    starred: topic.starred,
    archived: topic.archived,
    messageCount: topicMessages.length,
  };

  return (
    <article className="flex h-full min-h-0 flex-col md:border-l md:border-t md:rounded-l-2xl">
      <TopicToolbar
        topicId={summary.id}
        backHref={backHref}
        messageCount={summary.messageCount}
        starred={summary.starred}
        archived={summary.archived}
      />
      <section className="flex flex-col items-center md:p-4 p-2 overflow-y-auto">
        <div className="w-full md:max-w-3/5 flex flex-col gap-4">
          <TopicHeader summary={summary} latest={latestMessage} />
          <TopicLatestMessage message={latestMessage} />
          <ReplyForm
            topicId={summary.id}
            to={latestMessage.creator.firstName}
          />
          {earlierMessages.length > 0 && (
            <TopicMessages messages={earlierMessages} />
          )}
        </div>
      </section>
    </article>
  );
}
