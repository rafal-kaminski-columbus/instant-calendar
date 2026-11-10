import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { Topic as TopicType } from "@/lib/types";
import { currentUser } from "../mock-topics";

interface TopicProps extends TopicType {}

export function Topic({
  id,
  messages,
  subject,
  participants,
  creator,
  label,
}: TopicProps) {
  const others = participants.filter(
    (participant) => participant.id !== currentUser.id,
  );
  const participantsNames = others.map((participant) => participant.firstName);

  if (others.length !== participants.length) {
    participantsNames.push("me");
  }

  const avatarUser =
    creator.id === currentUser.id ? (others[0] ?? creator) : creator;
  const initials = avatarUser.firstName[0] + avatarUser.lastName[0];

  const messagesLength = messages.length;

  return (
    <Link href={`/topic/${id}`} className="flex gap-2 items-center">
      <Avatar size="lg">
        <AvatarFallback className="bg-primary text-primary-foreground">
          {initials}
        </AvatarFallback>
      </Avatar>
      <div>
        <div className="flex gap-1">
          <p>{participantsNames.join(", ")}</p>
          <p className="text-muted-foreground">{messagesLength}</p>
        </div>
        <p className="truncate">{subject}</p>
        {label && (
          <div className="flex gap-1 items-center font-light">
            <div
              className="h-2 w-2 bg-red-50 rounded-full"
              style={{ backgroundColor: label.color }}
            />
            <p>{label.name}</p>
          </div>
        )}
      </div>
    </Link>
  );
}
