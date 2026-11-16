import { notFound } from "next/navigation";
import { AnimatedSuspense } from "@/components/atoms/AnimatedSuspense";
import {
  TopicList,
  TopicListSkeleton,
} from "@/features/topic/components/TopicList";
import { isMailbox, MAILBOXES } from "@/lib/mailbox";

interface MailBoxProps extends PageProps<"/[mailbox]"> {}

export default function MailboxPage({ params }: MailBoxProps) {
  const query = params.then(({ mailbox }) => {
    if (!isMailbox(mailbox)) {
      notFound();
    }
    return { mailbox };
  });

  return (
    <AnimatedSuspense fallback={<TopicListSkeleton />}>
      {query.then(({ mailbox }) => (
        <TopicList source={mailbox} label={MAILBOXES[mailbox].label} />
      ))}
    </AnimatedSuspense>
  );
}
