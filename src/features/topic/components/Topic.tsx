import Link from "next/link";
import { MessageAvatar } from "@/components/molecules/MessageAvatar";
import { currentUser } from "@/lib/current-user";
import { getTopicShortDate } from "@/lib/pure";
import type { Topic as TopicType } from "@/lib/types";
import { TopicActions } from "./TopicActions";

interface TopicProps extends TopicType {
  source: string;
}

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
  source,
}: TopicProps) {
  const others = participants.filter(
    (participant) => participant.id !== currentUser.id,
  );
  const participantsNames = others.map((participant) => participant.firstName);

  if (others.length !== participants.length) {
    participantsNames.push("me");
  }

  const messagesLength = messages.length;
  const date = getTopicShortDate(lastMessageAt);

  return (
    <li className="relative flex h-20 justify-between border-b hover:bg-muted px-4 py-3  font-medium whitespace-nowrap last:border-0 sm:px-5 group">
      <Link
        href={`/${source}/${id}`}
        aria-label={subject}
        className="absolute inset-0"
      />
      <div className="flex gap-2 items-center">
        <MessageAvatar user={creator} />
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
