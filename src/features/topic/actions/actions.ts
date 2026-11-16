"use server";

import { revalidatePath } from "next/cache";
import type { TopicStateKeys } from "@/features/topic/topic-queries";
import { toggleTopicState as toggleState } from "@/features/topic/topic-queries";
import { currentUser } from "@/lib/current-user";

export async function toggleTopicState(
  state: TopicStateKeys,
  topicId: string,
  sourceUrl: string,
) {
  const id = Number(topicId);

  if (!Number.isInteger(id)) {
    throw new Error("topic not found");
  }

  await toggleState(currentUser.id, id, state);

  revalidatePath(sourceUrl);
}
