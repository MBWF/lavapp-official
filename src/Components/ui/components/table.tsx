import React from "react";
import { MoreHorizontal } from "lucide-react";
import { ReactNode } from "react";
import {
  Table as TablePrimitive,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import { Button } from "../button";

interface TableColumn<T> {
  header: string;
  accessor: keyof T;
  cell?: (value: T[keyof T]) => ReactNode;
}

interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  actions?: {
    label: string;
    items: { label: string; onClick: (item: T) => void }[];
  };
}

export default function Table<T>({ columns, data, actions }: TableProps<T>) {
  return (
    <TablePrimitive>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column.header}>{column.header}</TableHead>
          ))}
          {actions && (
            <TableHead>
              <span className="sr-only">Ações</span>
            </TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={index}>
            {columns.map((column) => (
              <TableCell key={column.header}>
                {column.cell
                  ? column.cell(item[column.accessor])
                  : (item[column.accessor] as ReactNode)}
              </TableCell>
            ))}
            {actions && (
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Abrir menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>{actions.label}</DropdownMenuLabel>
                    {actions.items.map((action, actionIndex) => (
                      <DropdownMenuItem
                        key={actionIndex}
                        onClick={() => action.onClick(item)}
                      >
                        {action.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </TablePrimitive>
  );
}
