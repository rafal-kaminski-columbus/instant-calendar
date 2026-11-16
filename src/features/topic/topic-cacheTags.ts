export const topicTags = {
  detail: (topicId: string) => `topics:${topicId}`,
  list: (userId: string) => `topics:list:${userId}`,
  labels: (userId: string) => `labels:${userId}`,
};
