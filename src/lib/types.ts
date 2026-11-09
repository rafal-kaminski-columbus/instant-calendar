import type { IconName } from "lucide-react/dynamic";

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
