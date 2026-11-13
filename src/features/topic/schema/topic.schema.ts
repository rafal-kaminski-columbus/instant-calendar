import * as z from "zod";

export const composeTopicSchema = z.object({
  recipientIds: z
    .array(z.string().min(1))
    .min(1, "Pick at least one recipient."),
  subject: z
    .string()
    .trim()
    .min(1, "Add a subject.")
    .max(200, "Keep the subject under 200 characters."),
  message: z
    .string()
    .trim()
    .min(1, "Write a message.")
    .max(4000, "Keep messages under 4000 characters."),
});

export type ComposeTopicInput = z.infer<typeof composeTopicSchema>;
