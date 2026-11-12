import type { Message } from "@/lib/types";
import { TopicMessageHeader } from "./TopicMessageHeader";

interface TopicMessageProps extends Message {}

export function TopicMessage(props: TopicMessageProps) {
  return (
    <li className="flex flex-col gap-4 py-8 border-b">
      <TopicMessageHeader {...props} />
      <p>{props.subject}</p>
    </li>
  );
}
