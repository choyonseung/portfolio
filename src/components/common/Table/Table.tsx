import { useEffect } from "react";
import type { ReactNode } from "react";
import clsx from "clsx";

import Checkbox from "@/components/common/Form/Checkbox";
import Radio from "@/components/common/Form/Radio";

interface Column<T> {
  header: string;
  accessor: keyof T;
  render?: (value: any, row: T) => ReactNode;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
  emptyText?: string;
  selectable?: boolean;
  selectionMode?: "multiple" | "single";
  selectedRows?: T[];
  onSelectionChange?: (rows: T[]) => void;
}

export default function Table<T extends { id?: string | number }>({
  columns,
  data,
  onRowClick,
  emptyText = "데이터가 없습니다.",
  selectable = false,
  selectionMode = "multiple",
  selectedRows = [],
  onSelectionChange,
}: TableProps<T>) {
  const isSelected = (row: T) =>
    selectedRows.some((r) => r.id === row.id);

  const toggleRow = (row: T) => {
    if (!onSelectionChange) return;

    const exists = selectedRows.some((r) => r.id === row.id);

    if (selectionMode === "single") {
      if (exists) {
        onSelectionChange([]);
      } else {
        onSelectionChange([row]);
      }
      return;
    }

    if (exists) {
      onSelectionChange(selectedRows.filter((r) => r.id !== row.id));
    } else {
      onSelectionChange([...selectedRows, row]);
    }
  };

  const toggleAll = () => {
    if (!onSelectionChange) return;
    if (selectionMode === "single") return;

    if (selectedRows.length === data.length) {
      onSelectionChange([]);
    } else {
      onSelectionChange(data);
    }
  };

  useEffect(() => {
    if (selectionMode === "single" && selectedRows.length > 1) {
      onSelectionChange?.(selectedRows.slice(0, 1));
    }
  }, [selectionMode]);

  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>
            {selectable && selectionMode === "multiple" && (
              <th className="table-checkbox">
                <Checkbox
                  size="sm"
                  checked={
                    selectedRows.length === data.length && data.length > 0
                  }
                  onChange={toggleAll}
                />
              </th>
            )}

            {selectable && selectionMode === "single" && (
              <th className="table-checkbox" />
            )}

            {columns.map((col) => (
              <th key={String(col.accessor)}>{col.header}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (selectable ? 1 : 0)}
                className="table-empty"
              >
                {emptyText}
              </td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr
                key={row.id ?? i}
                className={clsx({ "table-row-clickable": onRowClick })}
                onClick={() => onRowClick?.(row)}
              >
                {selectable && (
                  <td
                    className="table-checkbox"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {selectionMode === "multiple" ? (
                      <Checkbox
                        size="sm"
                        checked={isSelected(row)}
                        onChange={() => toggleRow(row)}
                      />
                    ) : (
                      <Radio
                        name="table-radio"
                        size="sm"
                        checked={isSelected(row)}
                        onChange={() => toggleRow(row)}
                      />
                    )}
                  </td>
                )}

                {columns.map((col) => (
                  <td key={String(col.accessor)}>
                    {col.render
                      ? col.render(row[col.accessor], row)
                      : (row[col.accessor] as ReactNode)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
