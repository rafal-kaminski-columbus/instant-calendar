"use client";

import { cn } from "cn";
import { Star } from "lucide-react";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import type { ButtonSize } from "@/components/ui/button-variants";
import { toggleTopicState } from "../actions/actions";

interface TopicStarButtonProps {
  topicId: string;
  starred: boolean;
  sourceUrl: string;
  size?: ButtonSize;
  className?: string;
}

export function TopicStarButton({
  topicId,
  starred,
  sourceUrl,
  size = "icon-lg",
  className,
}: TopicStarButtonProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      type="button"
      data-topic-id={topicId}
      aria-label={starred ? "Deselect Star from mail" : "Star mail"}
      variant="ghost"
      size={size}
      disabled={isPending}
      className={cn("text-muted-foreground hover:text-foreground", className)}
      onClick={() =>
        startTransition(() => toggleTopicState("starred", topicId, sourceUrl))
      }
    >
      <Star className={cn(starred && "fill-primary text-primary")} />
    </Button>
  );
}
