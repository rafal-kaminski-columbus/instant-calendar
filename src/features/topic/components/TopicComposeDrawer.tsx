"use client";
import { PencilLine, Send, X } from "lucide-react";
import Form from "next/form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { currentUser } from "../mock-topics";

export function TopicComposeDrawer() {
  const fullName = `${currentUser.firstName} ${currentUser.lastName}`;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const sentMessage = () => {};

  return (
    <Drawer
      modal={false}
      swipeDirection="right"
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DrawerTrigger render={<Button />}>
        <PencilLine />
        Compose
      </DrawerTrigger>
      <DrawerContent className="w-140 self-end">
        <DrawerHeader className="bg-sidebar border-t rounded-t-4xl">
          <DrawerTitle className="font-semibold">New Message</DrawerTitle>
          <DrawerDescription>
            Here create a new message and send it to your companions
          </DrawerDescription>
          <DrawerClose
            render={
              <Button
                variant="ghost"
                className="absolute top-2 right-2"
                size="icon-lg"
              />
            }
          >
            <X />
          </DrawerClose>
        </DrawerHeader>
        <Form action="" onSubmit={sentMessage}>
          <div className="flex flex-col gap-4 p-4">
            <h2 className="text-muted-foreground">
              From: {fullName} · {currentUser.email}
            </h2>
            <Field>
              <FieldLabel htmlFor="input-field-subject">Subject</FieldLabel>
              <Input
                id="input-field-subject"
                type="text"
                placeholder="Enter your username"
                name="subject"
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="textarea-message">Message</FieldLabel>
              <Textarea
                id="textarea-message"
                placeholder="Write your message here."
                className="min-h-48"
                name="message"
                required
              />
            </Field>
          </div>
          <DrawerFooter className="flex-row justify-end">
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
              Discard
            </Button>
            <Button type="submit" onClick={sentMessage}>
              <Send />
              Submit
            </Button>
          </DrawerFooter>
        </Form>
      </DrawerContent>
    </Drawer>
  );
}
