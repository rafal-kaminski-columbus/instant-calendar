import { getMessages } from "@/drizzle/schema/query";
import { TopicTable } from "@/features/topic/components/TopicTable";
import { mockTopics } from "@/features/topic/mock-topics";

export default function Home() {
  redirect("/inbox");
}
