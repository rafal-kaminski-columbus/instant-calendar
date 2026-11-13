"use client";
import { usePathname } from "next/navigation";
import { LabelList } from "@/components/molecules/LabelList";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { TopicComposeDrawer } from "@/features/topic/components/TopicComposeDrawer";
import { MAILBOX_KEYS, MAILBOXES } from "@/lib/mailbox";
import type { Tab } from "@/lib/types";
import { SidebarTab } from "./SidebarTab";

const email = process.env.NEXT_PUBLIC_USER_EMAIL;

const tabs: Tab[] = MAILBOX_KEYS.map((mailbox) => ({
  name: MAILBOXES[mailbox].label,
  href: `/${mailbox}`,
  icon: MAILBOXES[mailbox].icon,
}));

export function Sidebar() {
  const pathName = usePathname();

  const activeHref = tabs.find((tab) => pathName.includes(tab.href))?.href;

  return (
    <aside className="sm:w-60 flex flex-col justify-between h-full sm:p-4 sm:pt-2 p-3 pt-0">
      <article className="flex flex-col gap-8">
        <TopicComposeDrawer />
        <nav>
          <ul className="flex flex-col gap-1">
            {tabs.map((tab) => {
              const isActive = activeHref === tab.href;
              return (
                <SidebarTab key={tab.href} tab={tab} isActive={isActive} />
              );
            })}
          </ul>
        </nav>
        <LabelList />
      </article>
      <section className="flex items-center gap-2">
        <Avatar>
          <AvatarFallback className="bg-primary text-primary-foreground">
            RK
          </AvatarFallback>
        </Avatar>
        <div>
          <h4 className="font-semibold text-sm">Rafal Kaminski</h4>
          <h4 className="text-muted-foreground text-sm">{email}</h4>
        </div>
      </section>
    </aside>
  );
}
