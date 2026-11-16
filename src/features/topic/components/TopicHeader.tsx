import { Skeleton } from "@/components/ui/skeleton";
import { getTopicSummary } from "@/features/topic/topic-queries";
import { currentUser } from "@/lib/current-user";
import {
  TopicMessageHeader,
  TopicMessageHeaderSkeleton,
} from "./TopicMessageHeader";

interface TopicHeaderProps {
  topicId: string;
}

export async function TopicHeader({ topicId }: TopicHeaderProps) {
  const { subject, label, latest } = await getTopicSummary(
    currentUser.id,
    Number(topicId),
  );

  return (
    <header className="flex flex-col gap-6">
      <div className="flex gap-2">
        <h1 className="font-bold text-2xl">{subject}</h1>
        {label && (
          <div className="flex self-start items-center gap-1 text-xs">
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: label.color }}
            />
            {label.name}
          </div>
        )}
      </div>
      <TopicMessageHeader {...latest} />
    </header>
  );
}

export function TopicHeaderSkeleton() {
  return (
    <header className="flex flex-col gap-6">
      <div className="flex gap-2">
        <Skeleton className="h-8 w-2/3 rounded-sm" />
      </div>
      <TopicMessageHeaderSkeleton />
    </header>
  );
}
