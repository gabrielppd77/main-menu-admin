import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridValidRowModel,
  GridEventListener,
  useGridApiRef,
} from "@mui/x-data-grid";

interface DataTableProps<TData extends GridValidRowModel> {
  data: GridRowsProp<TData>;
  columns: GridColDef<TData>[];
  isPending?: boolean;
  onKeyDown?: (key: string, rows: TData[]) => void;
}

export function DataTable<TData extends GridValidRowModel>({
  data,
  columns,
  isPending,
  onKeyDown,
}: DataTableProps<TData>) {
  const apiRef = useGridApiRef();

  const handleCellKeyDown: GridEventListener<"cellKeyDown"> = (_, { key }) => {
    if (!onKeyDown) return;
    if (!apiRef.current) return;
    const rowsSelected = Array.from(
      apiRef.current.getSelectedRows().values(),
    ) as TData[];
    onKeyDown(key, rowsSelected);
  };

  return (
    <DataGrid
      apiRef={apiRef}
      loading={isPending}
      columns={columns}
      rows={data}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 25,
          },
        },
      }}
      onCellKeyDown={handleCellKeyDown}
      density="compact"
      disableColumnMenu
      disableColumnSorting
      pageSizeOptions={[10, 25, 50]}
      localeText={{
        noRowsLabel: "Sem dados",
        footerRowSelected: (count) =>
          count !== 1
            ? `${count.toLocaleString()} linhas selecionadas`
            : `${count.toLocaleString()} linha selecionada`,
        paginationRowsPerPage: "Linhas por página",
        paginationDisplayedRows: ({ from, to, count }) =>
          `${from}-${to} de ${count}`,
      }}
    />
  );
}
