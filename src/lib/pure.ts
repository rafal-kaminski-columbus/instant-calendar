export function getTopicShortDate(timestamp: string) {
  const date = new Date(timestamp);

  return Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
  }).format(date);
}

export function getTopicFullDate(timestamp: string) {
  const date = new Date(timestamp);

  return Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}
