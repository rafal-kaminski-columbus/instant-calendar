import { Separator } from "@/components/ui/separator";
import { TopicArchiveButton } from "./TopicArchiveButton";
import { TopicBackButton } from "./TopicBackButton";
import { TopicStarButton } from "./TopicStarButton";

interface TopicToolbarProps {
  topicId: string;
  backHref: string;
  sourceUrl: string;
  messageCount: number;
  starred: boolean;
  archived: boolean;
}

export function TopicToolbar({
  topicId,
  backHref,
  sourceUrl,
  messageCount,
  starred,
  archived,
}: TopicToolbarProps) {
  return (
    <div className="flex h-10 items-center justify-between border-b px-4 font-bold whitespace-nowrap text-foreground transition-colors hover:bg-muted/50 sm:px-5">
      <div className="flex gap-0.5">
        <TopicBackButton href={backHref} />
        <Separator orientation="vertical" />
        <TopicArchiveButton
          topicId={topicId}
          archived={archived}
          sourceUrl={sourceUrl}
        />
        <TopicStarButton
          topicId={topicId}
          starred={starred}
          sourceUrl={sourceUrl}
        />
      </div>
      <p className="text-muted-foreground text-xs">
        {messageCount === 1 ? "1 message" : `${messageCount} messages`}
      </p>
    </div>
  );
}
