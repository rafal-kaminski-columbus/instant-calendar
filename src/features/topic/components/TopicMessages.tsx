import { navigation } from "next/cache";
import { Skeleton } from "@/components/ui/skeleton";
import { getMessagesInTopic } from "../message-queries";
import { TopicMessage } from "./TopicMessage";
import { TopicMessageHeaderSkeleton } from "./TopicMessageHeader";

interface TopicMessagesProps {
  topicId: string;
}

export async function TopicMessages({ topicId }: TopicMessagesProps) {
  await navigation();
  const messages = await getMessagesInTopic(Number(topicId));

  return (
    <section>
      <ul className="first:border-t">
        {messages.map((message) => (
          <TopicMessage key={message.id} {...message} />
        ))}
      </ul>
    </section>
  );
}

interface TopicMessagesSkeletonProps {
  count?: number;
}

export function TopicMessagesSkeleton({
  count = 2,
}: TopicMessagesSkeletonProps) {
  return (
    <section>
      <ul className="first:border-t">
        {Array.from({ length: count }).map((_, index) => (
          <li
            // biome-ignore lint/suspicious/noArrayIndexKey: <for skeletons is fine>
            key={index}
            className="flex flex-col gap-4 border-b py-8"
          >
            <TopicMessageHeaderSkeleton />
            <Skeleton className="h-4 w-full rounded-sm" />
          </li>
        ))}
      </ul>
    </section>
  );
}
