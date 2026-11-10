import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getTopicDate } from "@/lib/pure";
import type { Topic as TopicType } from "@/lib/types";
import { currentUser } from "../mock-topics";
import { TopicActions } from "./TopicActions";

interface TopicProps extends TopicType {}

export function Topic({
  id,
  lastMessageAt,
  messages,
  subject,
  participants,
  creator,
  label,
  starred,
  archived,
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
  const date = getTopicDate(lastMessageAt);

  return (
    <li className="relative flex h-20 justify-between border-b hover:bg-muted px-4 pt-3 pb-1 font-medium whitespace-nowrap last:border-0 sm:px-5 group">
      <Link
        href={`/topic/${id}`}
        aria-label={subject}
        className="absolute inset-0"
      />
      <div className="flex gap-2 items-center">
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
          <p>{subject}</p>
          {label && (
            <div className="flex gap-1 items-center font-light">
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: label.color }}
              />
              <p>{label.name}</p>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <p className="text-muted-foreground self-end">{date}</p>
        <div className="relative z-20 flex">
          <TopicActions id={id} starred={starred} archived={archived} />
        </div>
      </div>
    </li>
  );
}
