interface SearchPageProps extends PageProps<"/search"> {}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { query } = await searchParams;

  return <h1>No results for {query}</h1>;
}
