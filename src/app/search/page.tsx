import { TopicList } from "@/features/topic/components/TopicList";

interface SearchPageProps extends PageProps<"/search"> {}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { query } = await searchParams;

  return <TopicList label="Search" topics={[]} source={"/search"} />;
}
