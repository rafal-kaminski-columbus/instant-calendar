import { Menu } from "lucide-react";
import { Suspense } from "react";
import { SearchBar } from "@/components/molecules/SearchBar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Sidebar } from "../Sidebar/Sidebar";

export function Header() {
  return (
    <header className="flex h-16 items-center gap-2 px-2">
      <div className="min-w-60 flex-1 hidden md:flex">
        <h1>COLUMBUS THE GREAT MAIL</h1>
      </div>
      <div className="flex-1 md:hidden flex items-center">
        <Sheet>
          <SheetTrigger>
            <Menu size={20} className="text-muted-foreground" />
          </SheetTrigger>
          <SheetContent side="left" className="max-w-64!">
            <SheetHeader>Columbus the great Mail</SheetHeader>
            <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
              <Sidebar />
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <Suspense>
        <SearchBar />
      </Suspense>
    </header>
  );
}
