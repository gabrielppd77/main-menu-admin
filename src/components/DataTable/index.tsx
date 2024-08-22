import { Box, LinearProgress } from "@mui/material";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridValidRowModel,
  GridEventListener,
  useGridApiRef,
} from "@mui/x-data-grid";

interface DataTableProps<TData extends GridValidRowModel> {
  data?: GridRowsProp<TData>;
  columns: GridColDef<TData>[];
  isLoading: boolean;
  isFetching: boolean;
  onKeyDown?: (key: string, rows: TData[]) => void;
}

export default function DataTable<TData extends GridValidRowModel>({
  data,
  columns,
  isLoading,
  isFetching,
  onKeyDown,
}: DataTableProps<TData>) {
  const apiRef = useGridApiRef();

  const handleCellKeyDown: GridEventListener<"cellKeyDown"> = (_, { key }) => {
    if (!onKeyDown) return;
    const rowsSelected = Array.from(
      apiRef.current.getSelectedRows().values()
    ) as TData[];
    onKeyDown(key, rowsSelected);
  };

  return (
    <Box>
      <LinearProgress
        variant={isFetching ? "indeterminate" : "determinate"}
        value={0}
      />
      <DataGrid
        apiRef={apiRef}
        loading={isLoading}
        autoHeight
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
        pageSizeOptions={[10, 25, 50]}
        localeText={{
          noRowsLabel: "Sem dados",
          footerRowSelected: (count) =>
            count !== 1
              ? `${count.toLocaleString()} linhas selecionadas`
              : `${count.toLocaleString()} linha selecionada`,
          MuiTablePagination: {
            labelRowsPerPage: "Linhas por página",
            labelDisplayedRows: ({ from, to, count }) =>
              `${from}-${to} de ${count}`,
          },
        }}
      />
    </Box>
  );
}
