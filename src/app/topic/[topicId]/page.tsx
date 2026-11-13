interface TopicDetailPageProps extends PageProps<"/topic/[topicId]"> {}

export default async function TopicDetailPage({
  params,
}: TopicDetailPageProps) {
  const { topicId } = await params;

  return <h1>Page for topic with id: {topicId}</h1>;
}
