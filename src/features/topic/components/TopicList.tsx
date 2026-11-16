import { MailX } from "lucide-react";
import { notFound } from "next/navigation";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getUserLabelTopics,
  getUserMailboxTopics,
} from "@/features/topic/topic-queries";
import { currentUser } from "@/lib/current-user";
import { isMailbox } from "@/lib/mailbox";
import type { TopicMeta } from "@/lib/types";
import { Topic } from "./Topic";

export interface TopicTableProps {
  label: string;
  source: string;
}

async function loadPage(source: string): Promise<TopicMeta[]> {
  if (!source) {
    notFound();
  }

  if (isMailbox(source)) {
    const topics = await getUserMailboxTopics(currentUser.id, source);

    return topics;
  }

  if (source === "/search") {
    return Promise.resolve([]);
  }

  const labelId = source.replace("label/", "");
  const topics = await getUserLabelTopics(
    currentUser.id,
    labelId.charAt(0).toUpperCase() + labelId.slice(1),
  );

  return topics;
}

export async function TopicList({ label, source }: TopicTableProps) {
  const topics = await loadPage(source);
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

interface TopicListSkeletonProps {
  count?: number;
}

export function TopicListSkeleton({ count = 5 }: TopicListSkeletonProps) {
  return (
    <article className="flex h-full min-h-0 flex-col md:border-l md:border-t md:rounded-l-2xl">
      <section className="relative min-h-0 w-full flex-1 overflow-x-hidden overflow-y-auto text-sm">
        <h1 className="flex h-10 items-center justify-between border-b px-4 sm:px-5">
          <Skeleton className="h-4 w-24 rounded-sm" />
        </h1>
        <ul>
          {Array.from({ length: count }).map((_, index) => (
            <li
              // biome-ignore lint/suspicious/noArrayIndexKey: <for skeletons is fine>
              key={index}
              className="flex h-20 items-center gap-2 border-b px-4 py-3 last:border-0 sm:px-5"
            >
              <Skeleton className="size-10 shrink-0 rounded-full" />
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-32 rounded-sm" />
                <Skeleton className="h-4 w-48 rounded-sm" />
              </div>
            </li>
          ))}
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
