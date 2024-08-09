import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridValidRowModel,
} from "@mui/x-data-grid";

interface DataTableProps<TData extends GridValidRowModel> {
  data?: GridRowsProp<TData>;
  columns: GridColDef<TData>[];
}

export default function DataTable<TData extends GridValidRowModel>({
  data,
  columns,
}: DataTableProps<TData>) {
  return (
    <DataGrid
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
        footerRowSelected: (count) =>
          count !== 1
            ? `${count.toLocaleString()} linhas selecionadas`
            : `${count.toLocaleString()} linha selecionada`,
        footerTotalVisibleRows: (visibleCount, totalCount) =>
          `${visibleCount.toLocaleString()} de ${totalCount.toLocaleString()}`,
        MuiTablePagination: {
          labelRowsPerPage: "Linhas por página",
        },
      }}
    />
  );
}
