"use client";
import { useState } from "react";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import type { User } from "@/lib/types";

const recipients = ["Emil", "Kacper"];

const fullName = (user: User) => `${user.firstName} ${user.lastName}`;

export function TopicRecipientsField() {
  const [selected, setSelected] = useState<User[]>([]);
  const anchor = useComboboxAnchor();

  return (
    <Field>
      <FieldLabel htmlFor="combobox-recipients">To</FieldLabel>
      <Combobox
        items={recipients}
        multiple
        value={selected}
        onValueChange={setSelected}
        itemToStringLabel={(user: User) => user.email}
      >
        <ComboboxChips ref={anchor}>
          <ComboboxValue>
            {(value: User[]) => (
              <>
                {value.map((user) => (
                  <ComboboxChip key={user.id} aria-label={user.email}>
                    {user.email}
                  </ComboboxChip>
                ))}
                <ComboboxChipsInput
                  id="combobox-recipients"
                  placeholder={value.length ? "" : "Search by email…"}
                />
              </>
            )}
          </ComboboxValue>
        </ComboboxChips>
        <ComboboxContent anchor={anchor}>
          <ComboboxEmpty>No users found.</ComboboxEmpty>
          <ComboboxList>
            {(user: User) => (
              <ComboboxItem key={user.id} value={user}>
                <span className="truncate">{user.email}</span>
                <span className="truncate text-muted-foreground text-xs">
                  {fullName(user)}
                </span>
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      {selected.map((user) => (
        <input
          key={user.id}
          type="hidden"
          name="recipientIds"
          value={user.id}
        />
      ))}
      <FieldDescription>
        Pick one or more people to send this message to.
      </FieldDescription>
    </Field>
  );
}
