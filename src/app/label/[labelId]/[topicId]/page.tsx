import { TopicDetail } from "@/features/topic/components/TopicDetail";

interface TopicDetailPageProps
  extends PageProps<"/label/[labelId]/[topicId]"> {}

export default async function TopicDetailPage({
  params,
}: TopicDetailPageProps) {
  const { labelId, topicId } = await params;

  return <TopicDetail topicId={topicId} backHref={`/label/${labelId}`} />;
}
