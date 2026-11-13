import Link from "next/link";
import { MessageAvatar } from "@/components/molecules/MessageAvatar";
import { currentUser } from "@/lib/current-user";
import { getTopicShortDate } from "@/lib/pure";
import type { TopicMeta } from "@/lib/types";
import { cn } from "@/lib/utils";
import { TopicActions } from "./TopicActions";

interface TopicProps extends TopicMeta {
  source: string;
}

export function Topic({
  id,
  lastMessageAt,
  messageCount,
  subject,
  participants,
  lastParticipant,
  label,
  starred,
  archived,
  read,
  source,
}: TopicProps) {
  const participantNamesWithoutCurrentUser = participants.filter(
    (participant) => participant !== currentUser.firstName,
  );

  if (participantNamesWithoutCurrentUser.length !== participants.length) {
    participantNamesWithoutCurrentUser.push("me");
  }

  const date = getTopicShortDate(lastMessageAt);

  return (
    <li className="relative flex h-20 justify-between border-b hover:bg-muted px-4 py-3  font-medium whitespace-nowrap last:border-0 sm:px-5 group">
      <Link
        href={`/${source}/${id}`}
        aria-label={subject}
        className="absolute inset-0"
      />
      <div className="flex gap-2 items-center">
        <MessageAvatar user={lastParticipant} />
        <div>
          <div className="flex gap-1">
            <p className={cn(!read && "font-bold")}>
              {participantNamesWithoutCurrentUser.join(", ")}
            </p>
            <p className="text-muted-foreground">{messageCount}</p>
          </div>
          <p className={cn(!read && "font-bold")}>{subject}</p>
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
        <p
          className={cn(
            "text-muted-foreground self-end",
            !read && "font-bold text-black",
          )}
        >
          {date}
        </p>
        <div className="relative z-20 flex">
          <TopicActions id={String(id)} starred={starred} archived={archived} />
        </div>
      </div>
    </li>
  );
}
