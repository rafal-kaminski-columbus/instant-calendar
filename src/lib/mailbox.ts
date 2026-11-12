import { Archive, Inbox, type LucideIcon, Send, Star } from "lucide-react";

export const MAILBOXES = {
  inbox: { label: "Inbox", icon: Inbox },
  starred: { label: "Starred", icon: Star },
  sent: { label: "Sent", icon: Send },
  archive: { label: "Archive", icon: Archive },
} as const satisfies Record<string, { label: string; icon: LucideIcon }>;

export type Mailbox = keyof typeof MAILBOXES;

export const MAILBOX_KEYS = Object.keys(MAILBOXES) as Mailbox[];

export function isMailbox(value: string): value is Mailbox {
  return value in MAILBOXES;
}
