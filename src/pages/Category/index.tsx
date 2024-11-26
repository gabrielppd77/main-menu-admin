import { Button, IconButton, Stack } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

import PageHeader from "@components/PageHeader";
import DataTable from "@components/DataTable";

import useDialog from "@hooks/useDialog";

import { useCategoryGetAll } from "@libs/queries/category/useCategoryGetAll";
import { useCategoryRemove } from "@libs/queries/category/useCategoryRemove";

import Form from "./Form";

import { confirmDelete } from "@libs/alert";

import { CategoryResponseDTO } from "@libs/queries/category/dtos/CategoryResponseDTO";

export default function Category() {
  const {
    toggle: toggleForm,
    isOpen: isOpenForm,
    data: dataForm,
  } = useDialog<CategoryResponseDTO | null>(null);

  const { data, isLoading, isFetching } = useCategoryGetAll();
  const { mutateAsync } = useCategoryRemove();

  return (
    <Stack gap={1} p={2}>
      <PageHeader
        title="Categorias"
        renderRight={
          <Button onClick={() => toggleForm(null)}>Adicionar</Button>
        }
      />

      <DataTable
        onKeyDown={(key, rows) => {
          if (key === "F2") {
            toggleForm(rows[0]);
          }
          if (key === "Delete") {
            confirmDelete(async () => await mutateAsync({ id: rows[0].id }));
          }
        }}
        data={data}
        isLoading={isLoading}
        isFetching={isFetching}
        columns={[
          {
            field: "order",
            headerName: "Ordem",
          },
          {
            field: "name",
            headerName: "Nome",
            flex: 1,
          },
          {
            field: "id",
            headerName: "Ações",
            renderCell: ({ value, row }) => (
              <Stack direction="row" height="100%" gap={0.5}>
                <IconButton onClick={() => toggleForm(row)}>
                  <Edit />
                </IconButton>
                <IconButton
                  onClick={() =>
                    confirmDelete(async () => await mutateAsync({ id: value }))
                  }
                >
                  <Delete />
                </IconButton>
              </Stack>
            ),
          },
        ]}
      />

      {isOpenForm && <Form data={dataForm} onClose={() => toggleForm(null)} />}
    </Stack>
  );
}
