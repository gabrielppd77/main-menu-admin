import { Button, IconButton, Stack } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

import PageHeader from "@components/PageHeader";
import DataTable from "@components/DataTable";

import useDialog from "@hooks/useDialog";

import { useProductGetAll } from "@libs/queries/product/useProductGetAll";
import { useProductRemove } from "@libs/queries/product/useProductRemove";

import Form from "./Form";

import { confirmDelete } from "@libs/alert";

export default function Product() {
  const {
    toggle: toggleForm,
    isOpen: isOpenForm,
    data: dataForm,
  } = useDialog<string | null>(null);

  const { data, isLoading, isFetching } = useProductGetAll();
  const { mutateAsync } = useProductRemove();

  return (
    <Stack gap={1} p={2}>
      <PageHeader
        title="Produtos"
        renderRight={
          <Button onClick={() => toggleForm(null)}>Adicionar</Button>
        }
      />

      <DataTable
        onKeyDown={(key, rows) => {
          if (key === "F2") {
            toggleForm(rows[0].id);
          }
          if (key === "Delete") {
            confirmDelete(
              async () => await mutateAsync({ params: { id: rows[0].id } })
            );
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
            flex: 2,
          },
          {
            field: "description",
            headerName: "Descrição",
            flex: 2,
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
                <IconButton onClick={() => toggleForm(row.id)}>
                  <Edit />
                </IconButton>
                <IconButton
                  onClick={() =>
                    confirmDelete(
                      async () => await mutateAsync({ params: { id: value } })
                    )
                  }
                >
                  <Delete />
                </IconButton>
              </Stack>
            ),
          },
        ]}
      />

      {isOpenForm && <Form id={dataForm} onClose={() => toggleForm(null)} />}
    </Stack>
  );
}
