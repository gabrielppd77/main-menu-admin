import { Stack } from "@mui/material";

import PageHeader from "@components/PageHeader";
import DataTable from "@components/DataTable";

import { useCategoryGetAll } from "@libs/queries/category/useCategoryGetAll";

export default function Category() {
  const { data, isLoading, isFetching } = useCategoryGetAll();

  return (
    <Stack gap={1} p={2}>
      <PageHeader title="Categorias" />

      <DataTable
        data={data}
        columns={[
          {
            field: "name",
            headerName: "Nome",
            flex: 1,
          },
          {
            field: "order",
            headerName: "Ordem",
          },
        ]}
      />
    </Stack>
  );
}
