import { notFound } from "next/navigation";
import { getUserMailboxTopics } from "@/drizzle/schema/query";
import { TopicList } from "@/features/topic/components/TopicList";
import { currentUser } from "@/lib/current-user";
import { isMailbox, MAILBOXES } from "@/lib/mailbox";
import type { TopicMeta } from "@/lib/types";

interface MailBoxProps extends PageProps<"/[mailbox]"> {}

export default async function MailboxPage({ params }: MailBoxProps) {
  const { mailbox } = await params;

  if (!isMailbox(mailbox)) {
    notFound();
  }

  const topics: TopicMeta[] = await getUserMailboxTopics(
    currentUser.id,
    mailbox,
  );

  return (
    <TopicList
      source={mailbox}
      label={MAILBOXES[mailbox].label}
      topics={topics}
    />
  );
}
