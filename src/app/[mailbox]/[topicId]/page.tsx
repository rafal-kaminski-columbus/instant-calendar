import { notFound } from "next/navigation";
import { TopicDetail } from "@/features/topic/components/TopicDetail";
import { isMailbox } from "@/lib/mailbox";

interface TopicDetailPageProps extends PageProps<"/[mailbox]/[topicId]"> {}

export default async function TopicDetailPage({
  params,
}: TopicDetailPageProps) {
  const { mailbox, topicId } = await params;

  if (!isMailbox(mailbox)) {
    notFound();
  }

  return <TopicDetail topicId={topicId} backHref={`/${mailbox}`} />;
}
