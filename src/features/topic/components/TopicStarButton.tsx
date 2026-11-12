"use client";

import { cn } from "cn";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ButtonSize } from "@/components/ui/button-variants";

interface TopicStarButtonProps {
  starred: boolean;
  size?: ButtonSize;
  className?: string;
}

export function TopicStarButton({
  starred,
  size = "icon-lg",
  className,
}: TopicStarButtonProps) {
  const handleClick = () => {};

  return (
    <Button
      type="button"
      aria-label={starred ? "Deselect Star from mail" : "Star mail"}
      variant="ghost"
      size={size}
      className={cn("text-muted-foreground hover:text-foreground", className)}
      onClick={handleClick}
    >
      <Star className={cn(starred && "fill-primary text-primary")} />
    </Button>
  );
}
