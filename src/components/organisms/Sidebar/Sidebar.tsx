"use client";
import { PencilLine } from "lucide-react";
import { usePathname } from "next/navigation";
import { LabelList } from "@/components/molecules/LabelList";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { Tab } from "@/lib/types";
import { SidebarTab } from "./SidebarTab";

const email = process.env.NEXT_PUBLIC_USER_EMAIL;

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
    <aside className="sm:w-60 flex flex-col justify-between h-full sm:p-4 sm:pt-2 p-3 pt-0">
      <article className="flex flex-col gap-8">
        <Button className="flex gap-2 w-full" size="lg">
          <PencilLine />
          Create
        </Button>
        <nav>
          <ul className="flex flex-col gap-1">
            {tabs.map((tab) => {
              const isActive = activeRoute?.href === tab.href;
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
