import { getUserLabelTopics } from "@/drizzle/schema/query";
import { TopicList } from "@/features/topic/components/TopicList";
import { currentUser } from "@/lib/current-user";

interface LabelPageProps extends PageProps<"/label/[labelId]"> {}

export default async function LabelPage({ params }: LabelPageProps) {
  const { labelId } = await params;
  const capitalizeLabelName =
    labelId.charAt(0).toUpperCase() + labelId.slice(1);
  const topics = await getUserLabelTopics(currentUser.id, capitalizeLabelName);

  return (
    <TopicList
      source={`label/${labelId}`}
      label={capitalizeLabelName}
      topics={topics}
    />
  );
}
