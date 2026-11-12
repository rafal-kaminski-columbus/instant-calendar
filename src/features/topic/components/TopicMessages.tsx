import type { Message } from "@/lib/types";
import { TopicMessage } from "./TopicMessage";

interface TopicMessagesProps {
  messages: Message[];
}

export function TopicMessages({ messages }: TopicMessagesProps) {
  return (
    <section>
      <ul className="first:border-t">
        {messages.map((message) => (
          <TopicMessage key={message.id} {...message} />
        ))}
      </ul>
    </section>
  );
}
