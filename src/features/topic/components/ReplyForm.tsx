import { Send } from "lucide-react";
import Form from "next/form";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";

interface ReplyFormProps {
  topicId: string;
  to: string;
}

export function ReplyForm({ topicId, to }: ReplyFormProps) {
  return (
    <Form action="" className="flex flex-col items-end gap-4">
      <input type="hidden" name="topicId" value={topicId} />
      <Field>
        <FieldLabel htmlFor="textarea-message" className="invisible">
          Message
        </FieldLabel>
        <Textarea
          id="textarea-message"
          name="message"
          placeholder={`Reply to ${to}...`}
          required
        />
      </Field>
      <Button type="submit" className="flex gap-2" size="lg">
        <Send /> Send
      </Button>
    </Form>
  );
}
