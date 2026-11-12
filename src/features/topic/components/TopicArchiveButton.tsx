"use client";

import { cn } from "cn";
import { Archive, ArchiveRestore } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ButtonSize } from "@/components/ui/button-variants";

interface TopicArchiveButtonProps {
  archived: boolean;
  size?: ButtonSize;
  className?: string;
}

export function TopicArchiveButton({
  archived,
  size = "icon-lg",
  className,
}: TopicArchiveButtonProps) {
  const handleClick = () => {};

  return (
    <Button
      type="button"
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
