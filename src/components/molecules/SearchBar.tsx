"use client";
import { Search } from "lucide-react";

import Form from "next/form";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useId, useLayoutEffect, useRef, useTransition } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";

const searchHref = (query: string) => {
  const href = query ? `/search?query=${encodeURIComponent(query)}` : "/search";

  return href;
};

export function SearchBar() {
  const id = useId();
  const [_isPending, startTransition] = useTransition();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();
  const query = searchParams.get("query") ?? "";
  const pathname = usePathname();

  useLayoutEffect(() => {
    const input = inputRef.current;
    if (!input) {
      return;
    }
    input.value = query;
    if (pathname === "/search") {
      input.focus();
    }
  }, [pathname, query]);

  return (
    <search className="w-full">
      <Form action="/search">
        <label className="sr-only" htmlFor={id}>
          Search Mail
        </label>
        <InputGroup className="flex-1 md:max-w-2xl rounded-lg">
          <InputGroupInput
            autoComplete="off"
            id={id}
            ref={inputRef}
            type="search"
            placeholder="Search..."
            name="query"
            onChange={(e) => {
              const href = searchHref(e.currentTarget.value.trim());
              startTransition(() => router.replace(href, { scroll: false }));
            }}
          />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>
      </Form>
    </search>
  );
}
