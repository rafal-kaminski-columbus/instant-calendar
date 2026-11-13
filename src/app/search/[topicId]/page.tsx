import { TopicDetail } from "@/features/topic/components/TopicDetail";

interface TopicDetailPageProps extends PageProps<"/search/[topicId]"> {}

export default async function TopicDetailPage({
  params,
  searchParams,
}: TopicDetailPageProps) {
  const [{ topicId }, { query }] = await Promise.all([params, searchParams]);

  const search = typeof query === "string" ? query.trim() : "";
  const backHref = search
    ? `/search?query=${encodeURIComponent(search)}`
    : "/search";

  return <TopicDetail topicId={topicId} backHref={backHref} />;
}
