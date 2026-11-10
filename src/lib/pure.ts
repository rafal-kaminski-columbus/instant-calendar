export function getTopicDate(timestamp: string) {
  const date = new Date(timestamp);

  return Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
  }).format(date);
}
