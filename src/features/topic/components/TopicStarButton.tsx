"use client";

import { cn } from "cn";
import { Star } from "lucide-react";
import { useOptimistic, useTransition } from "react";
import { Button } from "@/components/ui/button";
import type { ButtonSize } from "@/components/ui/button-variants";
import { toggleTopicState } from "../actions/actions";

interface TopicStarButtonProps {
  topicId: string;
  starred: boolean;
  size?: ButtonSize;
  revealOnHover?: boolean;
  className?: string;
}

export function TopicStarButton({
  topicId,
  starred,
  size = "icon-lg",
  revealOnHover = false,
  className,
}: TopicStarButtonProps) {
  const [_, startTransition] = useTransition();
  const [optimisticStarred, setOptimisticStarred] = useOptimistic(starred);

  return (
    <Button
      type="button"
      data-topic-id={topicId}
      aria-label={optimisticStarred ? "Deselect Star from mail" : "Star mail"}
      variant="ghost"
      size={size}
      className={cn(
        "text-muted-foreground hover:text-foreground",
        revealOnHover && !optimisticStarred && "invisible group-hover:visible",
        className,
      )}
      onClick={() =>
        startTransition(async () => {
          setOptimisticStarred((prev) => !prev);
          await toggleTopicState("starred", topicId);
        })
      }
    >
      <Star className={cn(optimisticStarred && "fill-primary text-primary")} />
    </Button>
  );
}
