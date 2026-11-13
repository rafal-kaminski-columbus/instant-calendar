import type { IconName } from "lucide-react/dynamic";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
}

export interface Tab {
  name: string;
  href: string;
  iconName: IconName;
}

export interface Label {
  id: string;
  name: string;
  color: string;
}

export interface Topic {
  id: string;
  subject: string;
  creator: User;
  participants: User[];
  messages: Message[];
  lastMessageAt: string;
  label: Label | null;
  read: boolean;
  starred: boolean;
  archived: boolean;
}

export interface Message {
  id: string;
  sender: User;
  participants: User[];
  subject: string;
  createdAt: string;
}
