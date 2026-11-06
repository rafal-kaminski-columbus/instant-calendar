"use client";
import { usePathname } from "next/navigation";
import type { Tab } from "@/lib/types";
import { SidebarTab } from "./SidebarTab";

export function Sidebar() {
  const tabs: Tab[] = [
    {
      name: "Inbox",
      href: "/",
      iconName: "inbox",
    },
    {
      name: "Starred",
      href: "/starred",
      iconName: "star",
    },
    {
      name: "Sent",
      href: "/sent",
      iconName: "send",
    },
    {
      name: "Archive",
      href: "/archived",
      iconName: "archive",
    },
  ];

  const pathName = usePathname();

  const activeRoute = tabs.find((tab) => tab.href === pathName);

  return (
    <aside className="w-64 min-h-full bg-sidebar p-4">
      <h2>Sidebar</h2>
      <nav>
        <ul className="flex flex-col gap-1">
          {tabs.map((tab) => {
            const isActive = activeRoute?.href === tab.href;
            return <SidebarTab key={tab.href} tab={tab} isActive={isActive} />;
          })}
        </ul>
      </nav>
    </aside>
  );
}
