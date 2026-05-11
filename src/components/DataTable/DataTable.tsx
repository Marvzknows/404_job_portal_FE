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
  loading?: boolean;
  loadingRows?: number;
};

export type HeaderType<T> = {
  key: string;
  label: string;
  className?: string;
  render?: (row: T) => React.ReactNode;
};

function SkeletonCell({ className }: { className?: string }) {
  return (
    <TableCell className={`p-6 ${className ?? ""}`}>
      <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
    </TableCell>
  );
}

function DataTable<T>({
  data,
  columns,
  caption,
  footer,
  emptyMessage = "No data available.",
  loading = false,
  loadingRows = 5,
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
                className={`p-6 text-xs font-semibold text-gray-500 uppercase tracking-wider ${col.className ?? ""}`}
              >
                {loading ? (
                  <div className="h-3 bg-gray-300 rounded animate-pulse w-16" />
                ) : (
                  col.label
                )}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {loading ? (
            Array.from({ length: loadingRows }).map((_, rowIndex) => (
              <TableRow
                key={rowIndex}
                className="border-b border-gray-100"
                style={{ animationDelay: `${rowIndex * 60}ms` }}
              >
                {columns.map((col) => (
                  <SkeletonCell
                    key={String(col.key)}
                    className={col.className}
                  />
                ))}
              </TableRow>
            ))
          ) : data.length === 0 ? (
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

        {!loading && footer && footer.length > 0 && (
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
