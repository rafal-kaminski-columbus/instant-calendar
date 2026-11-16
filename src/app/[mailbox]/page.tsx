import { notFound } from "next/navigation";
import { getUserMailboxTopics } from "@/drizzle/schema/query";
import { TopicList } from "@/features/topic/components/TopicList";
import { mockTopics } from "@/features/topic/mock-topics";
import { currentUser } from "@/lib/current-user";
import { isMailbox, MAILBOXES } from "@/lib/mailbox";
import type { Topic } from "@/lib/types";

interface MailBoxProps extends PageProps<"/[mailbox]"> {}

export default async function MailboxPage({ params }: MailBoxProps) {
  const { mailbox } = await params;

  if (!isMailbox(mailbox)) {
    notFound();
  }

  let topics: Topic[] = [];

  switch (mailbox) {
    case "inbox":
      console.log(await getUserMailboxTopics(1, "inbox"));
      topics = mockTopics.filter((topic) => !topic.archived);
      break;
    case "starred":
      topics = mockTopics.filter((topic) => topic.starred);
      break;
    case "archive":
      topics = mockTopics.filter((topic) => topic.archived);
      break;
    case "sent":
      topics = mockTopics.filter(
        (topic) => topic.creator.email === currentUser.email,
      );
      break;
  }

  return (
    <TopicList
      source={mailbox}
      label={MAILBOXES[mailbox].label}
      topics={topics}
    />
  );
}
