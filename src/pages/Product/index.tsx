import { Button, IconButton, Stack } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

import PageHeader from "@components/PageHeader";
import DataTable from "@components/DataTable";

import useDialog from "@hooks/useDialog";

import { useProductGetAll } from "@libs/queries/product/useProductGetAll";
import { useProductRemove } from "@libs/queries/product/useProductRemove";

import FormCreate from "./FormCreate";
import FormUpdate from "./FormUpdate";

import { confirmDelete } from "@libs/alert";

import { ProductResponseDTO } from "@libs/queries/product/dtos/ProductResponseDTO";

export default function Product() {
  const { toggle: toggleFormCreate, isOpen: isOpenFormCreate } = useDialog();
  const {
    toggle: toggleFormUpdate,
    isOpen: isOpenFormUpdate,
    data: dataFormUpdate,
  } = useDialog<ProductResponseDTO>();

  const { data, isLoading, isFetching } = useProductGetAll();
  const { mutateAsync } = useProductRemove();

  return (
    <Stack gap={1} p={2}>
      <PageHeader
        title="Produtos"
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
            flex: 2,
          },
          {
            field: "description",
            headerName: "Descrição",
            flex: 2,
          },
          {
            field: "order",
            headerName: "Ordem",
          },
          {
            field: "price",
            headerName: "Preço",
          },
          {
            field: "categoryName",
            headerName: "Categoria",
            flex: 1,
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
