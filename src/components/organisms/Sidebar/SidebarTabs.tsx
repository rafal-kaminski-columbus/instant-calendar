"use client";
import { usePathname } from "next/navigation";
import { MAILBOX_KEYS, MAILBOXES } from "@/lib/mailbox";
import type { Tab } from "@/lib/types";
import { SidebarTab } from "./SidebarTab";

const tabs: Tab[] = MAILBOX_KEYS.map((mailbox) => ({
  name: MAILBOXES[mailbox].label,
  href: `/${mailbox}`,
  icon: MAILBOXES[mailbox].icon,
}));

export function SidebarTabs() {
  const pathName = usePathname();

  const activeHref = tabs.find((tab) => pathName.includes(tab.href))?.href;

  return (
    <nav>
      <ul className="flex flex-col gap-1">
        {tabs.map((tab) => (
          <SidebarTab
            key={tab.href}
            tab={tab}
            isActive={activeHref === tab.href}
          />
        ))}
      </ul>
    </nav>
  );
}
