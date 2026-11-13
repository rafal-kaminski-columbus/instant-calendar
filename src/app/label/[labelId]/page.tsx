import { TopicList } from "@/features/topic/components/TopicList";
import { mockTopics } from "@/features/topic/mock-topics";

interface LabelPageProps extends PageProps<"/label/[labelId]"> {}

export default async function LabelPage({ params }: LabelPageProps) {
  const { labelId } = await params;

  const topics = mockTopics.filter((topic) => topic.label?.id === labelId);

  return <TopicList label={labelId} topics={topics} />;
}
