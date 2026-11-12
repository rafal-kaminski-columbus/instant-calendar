import { cn } from "cn";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button-variants";

interface TopicBackButtonProps {
  href: string;
}

export function TopicBackButton({ href }: TopicBackButtonProps) {
  return (
    <Link
      href={href}
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
