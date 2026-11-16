import { Suspense } from "react";
import { AnimatedSuspense } from "@/components/atoms/AnimatedSuspense";
import { TopicHeader, TopicHeaderSkeleton } from "./TopicHeader";
import {
  TopicLatestMessage,
  TopicLatestMessageSkeleton,
} from "./TopicLatestMessage";
import { TopicMessages, TopicMessagesSkeleton } from "./TopicMessages";
import { TopicToolbar, TopicToolbarSkeleton } from "./TopicToolbar";

interface TopicDetailProps {
  topicId: string;
  backHref: string;
}

export function TopicDetail({ topicId, backHref }: TopicDetailProps) {
  return (
    <article className="flex h-full min-h-0 flex-col md:border-l md:border-t md:rounded-l-2xl">
      <Suspense fallback={<TopicToolbarSkeleton />}>
        <TopicToolbar
          topicId={topicId}
          backHref={backHref}
          sourceUrl={`${backHref}/${topicId}`}
        />
      </Suspense>
      <section className="flex flex-col items-center md:p-4 p-2 overflow-y-auto">
        <div className="w-full md:max-w-3/5 flex flex-col gap-4">
          <AnimatedSuspense
            fallback={
              <>
                <TopicHeaderSkeleton />
                <TopicLatestMessageSkeleton />
                <TopicMessagesSkeleton />
              </>
            }
          >
            <TopicHeader topicId={topicId} />
            <AnimatedSuspense
              fallback={
                <>
                  <TopicLatestMessageSkeleton />
                  <TopicMessagesSkeleton />
                </>
              }
            >
              <TopicLatestMessage topicId={topicId} />
              <AnimatedSuspense fallback={<TopicMessagesSkeleton />}>
                <TopicMessages topicId={topicId} />
              </AnimatedSuspense>
            </AnimatedSuspense>
          </AnimatedSuspense>
        </div>
      </section>
    </article>
  );
}
