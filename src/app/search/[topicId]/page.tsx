import { Suspense } from "react";
import { TopicDetail } from "@/features/topic/components/TopicDetail";

interface TopicDetailPageProps extends PageProps<"/search/[topicId]"> {}

export default function TopicDetailPage({
  params,
  searchParams,
}: TopicDetailPageProps) {
  const query = Promise.all([params, searchParams]).then(
    ([{ topicId }, { query }]) => {
      const search = typeof query === "string" ? query.trim() : "";

      return {
        topicId,
        backHref: search
          ? `/search?query=${encodeURIComponent(search)}`
          : "/search",
      };
    },
  );

  return (
    <Suspense>
      {query.then(({ topicId, backHref }) => (
        <TopicDetail topicId={topicId} backHref={backHref} />
      ))}
    </Suspense>
  );
}
