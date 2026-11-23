"use client";
import { usePathname } from "next/navigation";
import { use } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import type { Label as LabelType } from "@/lib/types";
import { Label } from "../atoms/Label/Label";

interface LabelListProps {
  labels: Promise<LabelType[]>;
}

export function LabelList({ labels: labelsPromise }: LabelListProps) {
  const labels = use(labelsPromise);
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

interface LabelListSkeleton {
  count?: number;
}
export function LabelListSkeleton({ count = 3 }: LabelListSkeleton) {
  return (
    <section className="flex flex-col gap-2 px-2">
      <h2 className="text-muted-foreground">Labels</h2>
      <ul className="flex flex-col gap-2">
        {Array.from({ length: count }).map((_, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <for skeletons is fine>
          <li key={index} className="flex gap-2 items-center">
            <Skeleton className="h-6 rounded-sm w-full" />
          </li>
        ))}
      </ul>
    </section>
  );
}
