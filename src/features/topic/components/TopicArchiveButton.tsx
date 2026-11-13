"use client";

import { cn } from "cn";
import { Archive, ArchiveRestore } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ButtonSize } from "@/components/ui/button-variants";

interface TopicArchiveButtonProps {
  topicId: string;
  archived: boolean;
  size?: ButtonSize;
  className?: string;
}

export function TopicArchiveButton({
  topicId,
  archived,
  size = "icon-lg",
  className,
}: TopicArchiveButtonProps) {
  const handleClick = () => {};

  return (
    <Button
      type="button"
      data-topic-id={topicId}
      aria-label={archived ? "Unarchive" : "Archive"}
      variant="ghost"
      size={size}
      className={cn("text-muted-foreground hover:text-foreground", className)}
      onClick={handleClick}
    >
      {archived ? <ArchiveRestore /> : <Archive />}
    </Button>
  );
}
