import type { MessageMeta, TopicSummary } from "@/lib/types";
import { TopicMessageHeader } from "./TopicMessageHeader";

interface TopicHeaderProps {
  summary: TopicSummary;
  latest: MessageMeta;
}

export function TopicHeader({ summary, latest }: TopicHeaderProps) {
  const { subject, label } = summary;

  return (
    <header className="flex flex-col gap-6">
      <div className="flex gap-2">
        <h1 className="font-bold text-2xl">{subject}</h1>
        {label && (
          <div className="flex self-start items-center gap-1 text-xs">
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: label.color }}
            />
            {label.name}
          </div>
        )}
      </div>
      <TopicMessageHeader {...latest} />
    </header>
  );
}
