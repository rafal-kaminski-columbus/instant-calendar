import { notFound } from "next/navigation";
import type { TopicSummary } from "@/lib/types";
import { mockTopics } from "../mock-topics";
import { ReplyForm } from "./ReplyForm";
import { TopicHeader } from "./TopicHeader";
import { TopicLatestMessage } from "./TopicLatestMessage";
import { TopicMessages } from "./TopicMessages";
import { TopicToolbar } from "./TopicToolbar";

interface TopicDetailProps {
  topicId: string;
  backHref: string;
}

export function TopicDetail({ topicId, backHref }: TopicDetailProps) {
  const topic = mockTopics.find((topic) => topic.id === topicId);

  if (!topic || topic.messages.length === 0) {
    notFound();
  }

  const [latestMessage, ...earlierMessages] = topic.messages;

  const summary: TopicSummary = {
    id: topic.id,
    subject: topic.subject,
    label: topic.label,
    read: topic.read,
    starred: topic.starred,
    archived: topic.archived,
    messageCount: topic.messages.length,
    latest: latestMessage,
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
          <TopicHeader summary={summary} />
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
