import { DynamicIcon } from "lucide-react/dynamic";
import Link from "next/link";
import type { Tab } from "@/lib/types";
import { cn } from "@/lib/utils";

interface SidebarTabProps {
  tab: Tab;
  isActive?: boolean;
}

export function SidebarTab({ tab, isActive }: SidebarTabProps) {
  return (
    <li>
      <Link
        href={tab.href}
        className={cn(
          "flex items-center gap-2 px-2 py-1 rounded-full",
          isActive
            ? "bg-primary/30 text-primary font-bold"
            : "bg-transparent hover:bg-muted-foreground/10",
        )}
      >
        <DynamicIcon name={tab.iconName} size={20} />
        <h2 className="icon">{tab.name}</h2>
      </Link>
    </li>
  );
}
