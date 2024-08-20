import { Button, IconButton, Stack } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

import PageHeader from "@components/PageHeader";
import DataTable from "@components/DataTable";

import useDialog from "@hooks/useDialog";

import { useCategoryGetAll } from "@libs/queries/category/useCategoryGetAll";
import { useCategoryRemove } from "@libs/queries/category/useCategoryRemove";

import FormCreate from "./FormCreate";
import FormUpdate from "./FormUpdate";

import { confirmDelete } from "@libs/alert";

import { CategoryResponseDTO } from "@libs/queries/category/dtos/CategoryResponseDTO";

export default function Category() {
  const { toggle: toggleFormCreate, isOpen: isOpenFormCreate } = useDialog();
  const {
    toggle: toggleFormUpdate,
    isOpen: isOpenFormUpdate,
    data: dataFormUpdate,
  } = useDialog<CategoryResponseDTO>();

  const { data, isLoading, isFetching } = useCategoryGetAll({});
  const { mutateAsync } = useCategoryRemove();

  return (
    <Stack gap={1} p={2}>
      <PageHeader
        title="Categorias"
        renderRight={
          <Button onClick={() => toggleFormCreate()}>Adicionar</Button>
        }
      />

      <DataTable
        data={data}
        isLoading={isLoading}
        isFetching={isFetching}
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
          {
            field: "id",
            headerName: "Ações",
            renderCell: ({ value, row }) => (
              <Stack direction="row" height="100%" gap={0.5}>
                <IconButton onClick={() => toggleFormUpdate(row)}>
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

      {isOpenFormCreate && <FormCreate onClose={() => toggleFormCreate()} />}
      {isOpenFormUpdate && dataFormUpdate && (
        <FormUpdate data={dataFormUpdate} onClose={() => toggleFormUpdate()} />
      )}
    </Stack>
  );
}
