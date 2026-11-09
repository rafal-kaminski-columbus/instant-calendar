"use client";
import { useId } from "react";
import { Input } from "../ui/input";

export function SearchBar() {
  const id = useId();

  return (
    <search className="w-full">
      <form onSubmit={(e) => e.preventDefault()}>
        <label className="sr-only" htmlFor={id}>
          Search Mail
        </label>
        <Input
          autoComplete="off"
          id={id}
          type="search"
          placeholder="Search..."
          className="flex-1 md:max-w-150 rounded-lg"
          name="query"
        />
      </form>
    </search>
  );
}
