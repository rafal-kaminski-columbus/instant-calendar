import { getUserLabelTopics } from "@/drizzle/schema/query";
import { TopicList } from "@/features/topic/components/TopicList";
import { currentUser } from "@/lib/current-user";

interface LabelPageProps extends PageProps<"/label/[labelId]"> {}

export default async function LabelPage({ params }: LabelPageProps) {
  const { labelId } = await params;
  const topics = await getUserLabelTopics(currentUser.id, Number(labelId));

  return (
    <TopicList source={`label/${labelId}`} label={labelId} topics={topics} />
  );
}
