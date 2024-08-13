import { Box, LinearProgress } from "@mui/material";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridValidRowModel,
} from "@mui/x-data-grid";

interface DataTableProps<TData extends GridValidRowModel> {
  data?: GridRowsProp<TData>;
  columns: GridColDef<TData>[];
  isLoading: boolean;
  isFetching: boolean;
}

export default function DataTable<TData extends GridValidRowModel>({
  data,
  columns,
  isLoading,
  isFetching,
}: DataTableProps<TData>) {
  return (
    <Box>
      <LinearProgress
        variant={isFetching ? "indeterminate" : "determinate"}
        value={0}
      />
      <DataGrid
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
