"use client";
import { cn } from "cn";
import { Archive, ArchiveRestore, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TopicActionsProps {
  id: string;
  starred: boolean;
  archived: boolean;
}

export function TopicActions({ id, starred, archived }: TopicActionsProps) {
  return (
    <>
      <Button
        type="button"
        aria-label={archived ? "Unarchive" : "Archive"}
        size="icon"
        variant="ghost"
        className="invisible transition-none group-hover:visible"
      >
        {archived ? <ArchiveRestore /> : <Archive />}
      </Button>
      <Button
        type="button"
        aria-label={starred ? "Deselect Star from mail" : "Star mail"}
        size="icon"
        variant="ghost"
        className={cn(
          "transition-none",
          !starred && "invisible group-hover:visible",
        )}
      >
        <Star className={cn(starred && "fill-primary text-primary")} />
      </Button>
    </>
  );
}
