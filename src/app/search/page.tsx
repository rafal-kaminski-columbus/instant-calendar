interface SearchPageProps extends PageProps<"/search"> {}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { query } = await searchParams;

  // ? dodac source na 'search'
  return <h1>No results for {query}</h1>;
}
