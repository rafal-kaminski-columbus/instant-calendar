import type { IconName } from "lucide-react/dynamic";

export const MAILBOXES = {
  inbox: { label: "Inbox", iconName: "inbox" },
  starred: { label: "Starred", iconName: "star" },
  sent: { label: "Sent", iconName: "send" },
  archive: { label: "Archive", iconName: "archive" },
} as const satisfies Record<string, { label: string; iconName: IconName }>;

export type Mailbox = keyof typeof MAILBOXES;

export const MAILBOX_KEYS = Object.keys(MAILBOXES) as Mailbox[];

export function isMailbox(value: string): value is Mailbox {
  return value in MAILBOXES;
}
