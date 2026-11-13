import { LabelList } from "@/components/molecules/LabelList";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getUserLabels } from "@/drizzle/schema/query";
import { TopicComposeDrawer } from "@/features/topic/components/TopicComposeDrawer";
import { currentUser } from "@/lib/current-user";
import { SidebarTabs } from "./SidebarTabs";

const fullName = `${currentUser.firstName} ${currentUser.lastName}`;
const initials = currentUser.firstName[0] + currentUser.lastName[0];

export async function Sidebar() {
  const labels = await getUserLabels(currentUser.id);

  return (
    <aside className="sm:w-60 flex flex-col justify-between h-full sm:p-4 sm:pt-2 p-3 pt-0">
      <article className="flex flex-col gap-8">
        <TopicComposeDrawer />
        <SidebarTabs />
        <LabelList labels={labels} />
      </article>
      <section className="flex items-center gap-2">
        <Avatar>
          <AvatarFallback className="bg-primary text-primary-foreground">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div>
          <h4 className="font-semibold text-sm">{fullName}</h4>
          <h4 className="text-muted-foreground text-sm">{currentUser.email}</h4>
        </div>
      </section>
    </aside>
  );
}
