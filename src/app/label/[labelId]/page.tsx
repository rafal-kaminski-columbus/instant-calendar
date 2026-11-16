import { Suspense } from "react";
import {
  TopicList,
  TopicListSkeleton,
} from "@/features/topic/components/TopicList";

interface LabelPageProps extends PageProps<"/label/[labelId]"> {}

export default function LabelPage({ params }: LabelPageProps) {
  const query = params.then(({ labelId }) => ({
    labelId,
    name: labelId.charAt(0).toUpperCase() + labelId.slice(1),
  }));

  return (
    <Suspense fallback={<TopicListSkeleton />}>
      {query.then(({ labelId, name }) => (
        <TopicList source={`label/${labelId}`} label={name} />
      ))}
    </Suspense>
  );
}
