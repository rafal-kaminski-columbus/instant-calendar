import { Suspense } from "react";
import { TopicDetail } from "@/features/topic/components/TopicDetail";

interface TopicDetailPageProps
  extends PageProps<"/label/[labelId]/[topicId]"> {}

export default function TopicDetailPage({ params }: TopicDetailPageProps) {
  const query = params.then(({ labelId, topicId }) => ({ labelId, topicId }));

  return (
    <Suspense>
      {query.then(({ labelId, topicId }) => (
        <TopicDetail topicId={topicId} backHref={`/label/${labelId}`} />
      ))}
    </Suspense>
  );
}
