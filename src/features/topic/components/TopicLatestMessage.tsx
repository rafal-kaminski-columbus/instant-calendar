import type { Message } from "@/lib/types";

interface TopicLatestMessageProps {
  message: Message;
}

export function TopicLatestMessage({ message }: TopicLatestMessageProps) {
  return <article className="min-h-48">{message.subject}</article>;
}
