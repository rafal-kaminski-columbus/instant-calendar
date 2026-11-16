"use client";

import { cn } from "cn";
import { Archive, ArchiveRestore } from "lucide-react";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import type { ButtonSize } from "@/components/ui/button-variants";
import { toggleTopicState } from "../actions/actions";

interface TopicArchiveButtonProps {
  topicId: string;
  archived: boolean;
  sourceUrl: string;
  size?: ButtonSize;
  className?: string;
}

export function TopicArchiveButton({
  topicId,
  archived,
  sourceUrl,
  size = "icon-lg",
  className,
}: TopicArchiveButtonProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      type="button"
      data-topic-id={topicId}
      aria-label={archived ? "Unarchive" : "Archive"}
      variant="ghost"
      size={size}
      disabled={isPending}
      className={cn("text-muted-foreground hover:text-foreground", className)}
      onClick={() =>
        startTransition(() => toggleTopicState("archived", topicId, sourceUrl))
      }
    >
      {archived ? <ArchiveRestore /> : <Archive />}
    </Button>
  );
}
