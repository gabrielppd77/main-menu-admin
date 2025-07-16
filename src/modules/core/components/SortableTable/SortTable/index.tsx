import React from "react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { UniqueIdentifier } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import {
  CircularProgress,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { SortableRow } from "../SortableRow";

interface BaseItem {
  id: UniqueIdentifier;
}

interface ColumnType<TData> {
  field: keyof TData extends string ? keyof TData : never;
  headerName: string;
  renderRow?: (data: TData) => React.ReactNode;
  width?: string;
}

interface Props<TData> {
  data: TData[];
  columns: ColumnType<TData>[];
  onChange(items: TData[]): void;
  isLoading: boolean;
}

export function SortTable<TData extends BaseItem>({
  data,
  columns,
  onChange,
  isLoading,
}: Props<TData>) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={({ active, over }) => {
        if (over && active.id !== over?.id) {
          const activeIndex = data.findIndex(({ id }) => id === active.id);
          const overIndex = data.findIndex(({ id }) => id === over.id);

          onChange(arrayMove(data, activeIndex, overIndex));
        }
      }}
      modifiers={[restrictToVerticalAxis]}
    >
      <SortableContext items={data} strategy={verticalListSortingStrategy}>
        <TableContainer className="relative" component={Paper}>
          <Table
            size="small"
            aria-label="a dense table"
            sx={{ tableLayout: "fixed" }}
          >
            <TableHead>
              <TableRow>
                {columns.map((d) => (
                  <TableCell key={d.field} sx={{ width: d.width }}>
                    {d.headerName}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100/40">
                  <CircularProgress />
                </div>
              )}
              {data.map((item) => (
                <SortableRow key={item.id} id={item.id}>
                  {columns.map((col) => (
                    <TableCell key={col.field} width={col.width}>
                      {col.renderRow ? (
                        col.renderRow(item)
                      ) : (
                        <div>{item[col.field] as any}</div>
                      )}
                    </TableCell>
                  ))}
                </SortableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </SortableContext>
    </DndContext>
  );
}
