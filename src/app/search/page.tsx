import { Suspense } from "react";
import {
  TopicList,
  TopicListSkeleton,
} from "@/features/topic/components/TopicList";

interface SearchPageProps extends PageProps<"/search"> {}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.then(({ query }) => ({
    query: typeof query === "string" ? query : "",
  }));

  return (
    <Suspense fallback={<TopicListSkeleton />}>
      {query.then(() => (
        <TopicList source="/search" label="Search" />
      ))}
    </Suspense>
  );
}
