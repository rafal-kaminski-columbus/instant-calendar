import { Archive, ArrowLeft, Star } from "lucide-react";
import { notFound } from "next/navigation";
import { ReplyForm } from "@/components/molecules/ReplyForm";
import { Separator } from "@/components/ui/separator";
import { TopicMessageHeader } from "@/features/topic/components/TopicMessageHeader";
import { TopicMessages } from "@/features/topic/components/TopicMessages";
import { mockTopics } from "@/features/topic/mock-topics";

interface TopicDetailPageProps extends PageProps<"/[mailbox]/[topicId]"> {}

export default async function TopicDetailPage({
  params,
}: TopicDetailPageProps) {
  const { topicId } = await params;
  const topic = mockTopics.find((topic) => topic.id === topicId);

  if (!topic) {
    notFound();
  }

  const lastMessage = topic.messages[0];
  const earlierMessages = topic.messages.slice(1);

  return (
    <article className="flex h-full min-h-0 flex-col md:border-l md:border-t md:rounded-l-2xl">
      <div className="flex h-10 items-center justify-between border-b px-4 font-bold whitespace-nowrap text-foreground transition-colors hover:bg-muted/50 sm:px-5">
        <div className="flex gap-2">
          <ArrowLeft />
          <Separator orientation="vertical" />
          <Archive />
          <Star />
        </div>
        <p className="text-muted-foreground text-xs">
          {topic.messages.length} messages
        </p>
      </div>
      <section className="flex flex-col items-center md:p-4 p-2 overflow-y-auto">
        <div className="w-full md:max-w-3/5 flex flex-col gap-4">
          <header className="flex flex-col gap-6">
            <div className="flex gap-2">
              <h1 className="font-bold text-2xl">{topic.subject}</h1>
              <div className="flex self-start items-center gap-1 text-xs">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: topic.label?.color }}
                />
                {topic.label?.name}
              </div>
            </div>
            <TopicMessageHeader {...lastMessage} />
          </header>
          <article className="min-h-48">{lastMessage.subject}</article>
          <ReplyForm />
          {earlierMessages && earlierMessages.length > 0 && (
            <TopicMessages messages={earlierMessages} />
          )}
        </div>
      </section>
    </article>
  );
}
