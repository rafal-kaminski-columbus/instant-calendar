import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface TopicTableProps {
  label: string;
}

export function TopicTable({ label }: TopicTableProps) {
  return (
    <article className=" h-full border-l border-t rounded-l-2xl">
      <Table>
        <TableHeader className="w-full">
          <TableRow>
            <TableHead className="w-full font-bold p-4">{label}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="w-full">
          <TableRow className="bg-sidebar">
            <TableCell className="font-medium">Obiekt</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </article>
  );
}
