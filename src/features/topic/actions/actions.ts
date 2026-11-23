"use server";

import { updateTag } from "next/cache";
import type { TopicStateKeys } from "@/features/topic/topic-queries";
import { toggleTopicState as toggleState } from "@/features/topic/topic-queries";
import { currentUser } from "@/lib/current-user";
import { topicTags } from "../topic-cacheTags";

export async function toggleTopicState(state: TopicStateKeys, topicId: string) {
  const id = Number(topicId);

  if (!Number.isInteger(id)) {
    throw new Error("topic not found");
  }

  await toggleState(currentUser.id, id, state);

  updateTag(topicTags.detail(topicId));
  updateTag(topicTags.list(String(currentUser.id)));
}
