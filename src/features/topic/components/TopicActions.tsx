"use client";
import { cn } from "cn";
import { TopicArchiveButton } from "@/features/topic/components/TopicArchiveButton";
import { TopicStarButton } from "@/features/topic/components/TopicStarButton";

interface TopicActionsProps {
  id: string;
  starred: boolean;
  archived: boolean;
}

export function TopicActions({ id, starred, archived }: TopicActionsProps) {
  return (
    <>
      <TopicArchiveButton
        topicId={id}
        archived={archived}
        size="icon"
        className="invisible transition-none group-hover:visible"
      />
      <TopicStarButton
        topicId={id}
        starred={starred}
        size="icon"
        className={cn(
          "transition-none",
          !starred && "invisible group-hover:visible",
        )}
      />
    </>
  );
}
