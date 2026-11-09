"use client";
import { usePathname } from "next/navigation";
import type { Label as LabelType } from "@/lib/types";
import { Label } from "../atoms/Label/Label";

export function LabelList() {
  const pathName = usePathname();
  const activeLabel = pathName.split("/")[2];

  const labels: LabelType[] = [
    {
      id: "work",
      name: "Work",
      color: "#3b82f6",
    },
    {
      id: "personal",
      name: "Personal",
      color: "#22c55e",
    },
    {
      id: "family",
      name: "Family",
      color: "#f59e0b",
    },
    {
      id: "travel",
      name: "Travel",
      color: "#8b5cf6",
    },
    {
      id: "health",
      name: "Health",
      color: "#f43f5e",
    },
  ];

  if (labels.length === 0) {
    return <h2>No labels Currently.</h2>;
  }

  return (
    <section className="flex flex-col gap-2 px-2">
      <h2 className="text-muted-foreground">Labels</h2>
      <ul className="flex flex-col gap-2">
        {labels.map((label) => {
          const isActive = activeLabel === label.name;
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
