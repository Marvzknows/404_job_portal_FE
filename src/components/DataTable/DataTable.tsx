"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ReactNode } from "react";

// Column definition type
export type ColumnDef<T> = {
  key: keyof T | string;
  label: string;
  className?: string;
  render?: (row: T) => ReactNode;
};

// Footer cell definition
export type FooterCell = {
  colSpan?: number;
  content: ReactNode;
  className?: string;
};

type DataTableProps<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  caption?: string;
  footer?: FooterCell[];
  emptyMessage?: string;
};

export type HeaderType<T> = {
  key: string;
  label: string;
  className?: string;
  render?: (row: T) => React.ReactNode;
};

function DataTable<T>({
  data,
  columns,
  caption,
  footer,
  emptyMessage = "No data available.",
}: DataTableProps<T>) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <Table>
        {caption && <TableCaption>{caption}</TableCaption>}

        <TableHeader>
          <TableRow className="bg-gray-50 border-b border-gray-200 hover:bg-violet-100">
            {columns.map((col) => (
              <TableHead
                key={String(col.key)}
                className={`p-6 text-xs font-semibold text-gray-500 uppercase tracking-wider  ${col.className ?? ""}`}
              >
                {col.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="text-center text-muted-foreground py-8"
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, index) => (
              <TableRow
                key={index}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                {columns.map((col) => (
                  <TableCell
                    key={String(col.key)}
                    className={`p-6 text-sm text-gray-700 ${col.className ?? ""}`}
                  >
                    {col.render
                      ? col.render(row)
                      : String(row[col.key as keyof T] ?? "")}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>

        {footer && footer.length > 0 && (
          <TableFooter>
            <TableRow>
              {footer.map((cell, i) => (
                <TableCell
                  key={i}
                  colSpan={cell.colSpan}
                  className={cell.className}
                >
                  {cell.content}
                </TableCell>
              ))}
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </div>
  );
}

export default DataTable;
