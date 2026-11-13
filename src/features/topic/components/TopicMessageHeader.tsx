import { MessageAvatar } from "@/components/molecules/MessageAvatar";
import { getTopicFullDate } from "@/lib/pure";
import type { MessageMeta } from "@/lib/types";

interface TopicMessageHeaderProps extends MessageMeta {}

export function TopicMessageHeader({
  creator,
  participants,
  createdAt,
}: TopicMessageHeaderProps) {
  const creatorName = `${creator.firstName} ${creator.lastName}`;
  const participantFirstNames = participants.map(
    (participant) => participant.firstName,
  );
  const fullDate = getTopicFullDate(createdAt);

  return (
    <div className="flex justify-between">
      <div className="flex gap-2">
        <MessageAvatar user={creator} />
        <div>
          <span className="flex items-center gap-1">
            <h2>{creatorName}</h2>
            <span className="text-sm text-muted-foreground">
              {creator.email}
            </span>
          </span>
          <h3 className="text-sm text-muted-foreground">
            To: {participantFirstNames.join(", ")}
          </h3>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">{fullDate}</p>
    </div>
  );
}
