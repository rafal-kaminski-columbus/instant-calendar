"use client";
import { usePathname } from "next/navigation";
import type { Label as LabelType } from "@/lib/types";
import { Label } from "../atoms/Label/Label";

interface LabelListProps {
  labels: LabelType[];
}

export function LabelList({ labels }: LabelListProps) {
  const pathName = usePathname();
  const activeHref = pathName.split("/");

  if (labels.length === 0) {
    return <h2>No labels Currently.</h2>;
  }

  return (
    <section className="flex flex-col gap-2 px-2">
      <h2 className="text-muted-foreground">Labels</h2>
      <ul className="flex flex-col gap-2">
        {labels.map((label) => {
          const isActive =
            activeHref[2] === label.name.toLowerCase() &&
            activeHref[1] === "label";
          return (
            <li key={label.id}>
              <Label isActive={isActive} {...label} />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
