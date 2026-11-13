import { MailX } from "lucide-react";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import type { TopicMeta } from "@/lib/types";
import { Topic } from "./Topic";

export interface TopicTableProps {
  label: string;
  topics: TopicMeta[];
  source: string;
}

export function TopicList({ label, topics, source }: TopicTableProps) {
  const noTopics = topics.length === 0;

  return (
    <article className="flex h-full min-h-0 flex-col md:border-l md:border-t md:rounded-l-2xl">
      <section className="relative min-h-0 w-full flex-1 overflow-x-hidden overflow-y-auto text-sm">
        <h1 className="flex h-10 items-center justify-between border-b px-4 font-bold whitespace-nowrap text-foreground transition-colors hover:bg-muted/50 sm:px-5">
          {label}
        </h1>
        <ul>
          {noTopics ? (
            <div className="p-2">
              <TopicListEmptyState />
            </div>
          ) : (
            topics.map((topic) => (
              <Topic key={topic.id} source={source} {...topic} />
            ))
          )}
        </ul>
      </section>
    </article>
  );
}

function TopicListEmptyState() {
  return (
    <Empty className="border border-dashed">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <MailX />
        </EmptyMedia>
        <EmptyTitle>No results</EmptyTitle>
        <EmptyDescription>
          We couldn't find you any emails here
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
