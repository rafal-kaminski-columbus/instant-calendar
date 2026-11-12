import { Send } from "lucide-react";
import Form from "next/form";
import { Button } from "../ui/button";
import { Field, FieldLabel } from "../ui/field";
import { Textarea } from "../ui/textarea";

export function ReplyForm() {
  return (
    <Form action="" className="flex flex-col items-end gap-4">
      <Field>
        <FieldLabel htmlFor="textarea-message" className="invisible">
          Message
        </FieldLabel>
        <Textarea id="textarea-message" placeholder="Reply..." required />
      </Field>
      <Button type="submit" className="flex gap-2" size="lg">
        <Send /> Send
      </Button>
    </Form>
  );
}
