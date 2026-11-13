import Link from "next/link";
import type { Label as LabelType } from "@/lib/types";

interface LabelProps extends LabelType {
  isActive: boolean;
}

export function Label({ id, name, color, isActive }: LabelProps) {
  return (
    <Link
      href={`/label/${id}`}
      className="flex gap-2 items-center hover:bg-muted-foreground/10 px-2 py-1 rounded-full"
    >
      <div
        className="size-2.5 shrink-0 rounded-full"
        style={{ backgroundColor: color }}
      />
      <h3 className="font-medium" style={isActive ? { color: color } : {}}>
        {name}
      </h3>
    </Link>
  );
}
