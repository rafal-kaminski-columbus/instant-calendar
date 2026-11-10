import { TopicTable } from "@/features/topic/components/TopicTable";
import { mockTopics } from "@/features/topic/mock-topics";

export default function InboxPage() {
  const topics = mockTopics.filter((topic) => !topic.archived);

  return <TopicTable label="Inbox" topics={topics} />;
}
