import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { getTopicSummary } from "@/features/topic/topic-queries";
import { currentUser } from "@/lib/current-user";
import { toggleTopicState } from "../actions/actions";
import { TopicArchiveButton } from "./TopicArchiveButton";
import { TopicBackButton } from "./TopicBackButton";
import { TopicStarButton } from "./TopicStarButton";

interface TopicToolbarProps {
  topicId: string;
  backHref: string;
}

export async function TopicToolbar({ topicId, backHref }: TopicToolbarProps) {
  const { messageCount, archived, starred, read } = await getTopicSummary(
    currentUser.id,
    Number(topicId),
  );

  if (!read) {
    await toggleTopicState("read", topicId);
  }

  return (
    <div className="flex h-10 items-center justify-between border-b px-4 font-bold whitespace-nowrap text-foreground transition-colors hover:bg-muted/50 sm:px-5">
      <div className="flex gap-0.5">
        <TopicBackButton href={backHref} />
        <Separator orientation="vertical" />
        <TopicArchiveButton topicId={topicId} archived={archived} />
        <TopicStarButton topicId={topicId} starred={starred} />
      </div>
      <p className="text-muted-foreground text-xs">
        {messageCount === 1 ? "1 message" : `${messageCount} messages`}
      </p>
    </div>
  );
}

export function TopicToolbarSkeleton() {
  return (
    <div className="flex h-10 items-center justify-between border-b px-4 sm:px-5">
      <div className="flex items-center gap-0.5">
        <Skeleton className="size-9 rounded-md" />
        <Separator orientation="vertical" />
        <Skeleton className="size-9 rounded-md" />
        <Skeleton className="size-9 rounded-md" />
      </div>
      <Skeleton className="h-3 w-20 rounded-sm" />
    </div>
  );
}
