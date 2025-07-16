import { Button, IconButton, Stack } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

import PageHeader from "@modules/core/components/PageHeader";
import DataTable from "@modules/core/components/DataTable";

import useDialog from "@modules/core/hooks/useDialog";
import { confirmDelete } from "@libs/alert";

import Form, { FormDataType } from "./Form";
import ChangePosition from "./ChangePosition";

import { useListAll, useUpdateListAll } from "./@hooks/useListAll";
import { useRemove } from "./@hooks/useRemove";

export default function Category() {
  const {
    toggle: toggleForm,
    isOpen: isOpenForm,
    data: dataForm,
  } = useDialog<FormDataType | null>(null);

  const { toggle: toggleChangePosition, isOpen: isOpenChangePosition } =
    useDialog(null);
  const { mutateAsync: mutateAsyncRemove } = useRemove();

  const { data, isPending } = useListAll();
  const { handleChange } = useUpdateListAll();

  async function removeCategory(categoryId: string) {
    await mutateAsyncRemove({ categoryId });
    handleChange();
  }

  return (
    <Stack gap={1} p={2}>
      <PageHeader
        title="Categorias"
        renderRight={
          <div className="flex gap-2">
            <Button onClick={() => toggleChangePosition(null)}>
              Mudar posição
            </Button>
            <Button onClick={() => toggleForm(null)}>Adicionar</Button>
          </div>
        }
      />

      <DataTable
        onKeyDown={(key, rows) => {
          if (key === "F2") {
            toggleForm(rows[0]);
          }
          if (key === "Delete") {
            confirmDelete(async () => await removeCategory(rows[0].id));
          }
        }}
        data={data}
        isPending={isPending}
        columns={[
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
                    confirmDelete(async () => await removeCategory(value))
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

      <ChangePosition
        isOpen={isOpenChangePosition}
        onClose={() => toggleChangePosition(null)}
      />
    </Stack>
  );
}
