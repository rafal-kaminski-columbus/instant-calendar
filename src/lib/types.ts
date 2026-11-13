import type { LucideIcon } from "lucide-react";

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
}

export interface Tab {
  name: string;
  href: string;
  icon: LucideIcon;
}

export interface Label {
  id: string;
  name: string;
  color: string;
}

export interface TopicMeta {
  id: number;
  subject: string;
  lastParticipant: User;
  participants: string[];
  messageCount: number;
  lastMessageAt: string;
  label: Label | null;
  read: boolean;
  starred: boolean;
  archived: boolean;
}

export interface Topic extends TopicMeta {
  messages: Message[];
}

export interface MessageMeta {
  id: string;
  creator: User;
  participants: string[];
  createdAt: string;
}

export interface Message extends MessageMeta {
  subject: string;
}

export interface TopicSummary {
  id: string;
  subject: string;
  label: Label | null;
  read: boolean;
  starred: boolean;
  archived: boolean;
  messageCount: number;
  latest: MessageMeta;
}
