import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Topic as TopicType } from "@/lib/types";
import { Topic } from "./Topic";

export interface TopicTableProps {
  label: string;
  topics: TopicType[];
}

export function TopicTable({ label, topics }: TopicTableProps) {
  return (
    <article className=" h-full md:border-l md:border-t md:rounded-l-2xl">
      <Table>
        <TableHeader className="w-full">
          <TableRow>
            <TableHead className="flex justify-between items-center w-full font-bold sm:px-5 px-4">
              <h1>{label}</h1>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="w-full overflow-y-scroll">
          {topics.map((topic) => (
            <TableRow key={topic.id} className="bg-primary-foreground/50">
              <TableCell className="font-medium sm:px-5 px-4 py-3 h-20">
                <Topic {...topic} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </article>
  );
}
