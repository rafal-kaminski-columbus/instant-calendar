export default function Loading() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="size-6 animate-spin rounded-full border-2 border-muted border-t-foreground" />
      <span className="sr-only">Loading conversation</span>
    </div>
  );
}
