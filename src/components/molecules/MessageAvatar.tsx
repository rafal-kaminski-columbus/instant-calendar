import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { currentUser } from "@/features/topic/mock-topics";
import type { User } from "@/lib/types";

interface MessageAvatarProps {
  user: User;
  size?: "default" | "sm" | "lg";
}

export function MessageAvatar({ user, size = "lg" }: MessageAvatarProps) {
  const isCurrentUser = user.id === currentUser.id;
  const initials = isCurrentUser ? "Me" : user.firstName[0] + user.lastName[0];

  return (
    <Avatar size={size}>
      <AvatarFallback className="bg-primary text-primary-foreground">
        {initials}
      </AvatarFallback>
    </Avatar>
  );
}
