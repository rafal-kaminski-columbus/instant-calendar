import { Skeleton } from "@/components/ui/skeleton";
import { getLatestMessageInTopic } from "../message-queries";
import { ReplyForm } from "./ReplyForm";

interface TopicLatestMessageProps {
  topicId: string;
}

export async function TopicLatestMessage({ topicId }: TopicLatestMessageProps) {
  const message = await getLatestMessageInTopic(Number(topicId));

  if (!message) {
    return null;
  }

  return (
    <section>
      <article className="min-h-48">{message.subject}</article>
      <ReplyForm topicId={topicId} to={message.participants.join(", ")} />
    </section>
  );
}

interface TopicLatestMessageSkeletonProps {
  count?: number;
}

export function TopicLatestMessageSkeleton({
  count = 4,
}: TopicLatestMessageSkeletonProps) {
  return (
    <section>
      <article className="flex min-h-48 flex-col gap-3">
        {Array.from({ length: count }).map((_, index) => (
          <Skeleton
            // biome-ignore lint/suspicious/noArrayIndexKey: <for skeletons is fine>
            key={index}
            className="h-4 w-full rounded-sm"
          />
        ))}
      </article>
      <div className="flex flex-col items-end gap-4">
        <Skeleton className="h-16 w-full rounded-md" />
        <Skeleton className="h-10 w-28 rounded-md" />
      </div>
    </section>
  );
}
