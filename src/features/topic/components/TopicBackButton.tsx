import { cn } from "cn";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button-variants";

interface TopicBackButtonProps {
  backHref: string;
}

export function TopicBackButton({ backHref }: TopicBackButtonProps) {
  return (
    <Link
      href={`/${backHref}`}
      aria-label="Go back"
      className={cn(
        buttonVariants({ variant: "ghost", size: "icon-lg" }),
        "text-muted-foreground hover:text-foreground",
      )}
    >
      <ArrowLeft />
    </Link>
  );
}
