import { notFound } from "next/navigation";
import { Suspense } from "react";
import { TopicDetail } from "@/features/topic/components/TopicDetail";
import { isMailbox } from "@/lib/mailbox";

interface TopicDetailPageProps extends PageProps<"/[mailbox]/[topicId]"> {}

export default function TopicDetailPage({ params }: TopicDetailPageProps) {
  const query = params.then(({ mailbox, topicId }) => {
    if (!isMailbox(mailbox)) {
      notFound();
    }
    return { mailbox, topicId };
  });

  return (
    <Suspense>
      {query.then(({ mailbox, topicId }) => (
        <TopicDetail topicId={topicId} backHref={`/${mailbox}`} />
      ))}
    </Suspense>
  );
}
