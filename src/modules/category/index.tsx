import { Button, IconButton, Stack } from "@mui/material";

import PageHeader from "@modules/core/components/PageHeader";
import DataTable from "@modules/core/components/DataTable";
import useDialog from "@modules/core/hooks/useDialog";
import { Delete, Edit } from "@mui/icons-material";
import { confirmDelete } from "@libs/alert";

import Form from "./Form";
import ChangePosition from "./ChangePosition";

const data = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Name ${i + 1}`,
}));

export default function Category() {
  const {
    toggle: toggleForm,
    isOpen: isOpenForm,
    data: dataForm,
  } = useDialog<null>(null);

  return (
    <Stack gap={1} p={2}>
      <PageHeader
        title="Categorias"
        renderRight={
          <Button onClick={() => toggleForm(null)}>Adicionar</Button>
        }
      />

      <ChangePosition />

      <DataTable
        onKeyDown={(key, rows) => {
          console.log({ key, rows });
          if (key === "F2") {
            toggleForm(null);
            // toggleForm(rows[0]);
          }
          if (key === "Delete") {
            confirmDelete(async () => undefined);
            // confirmDelete(async () => await mutateAsync({ id: rows[0].id }));
          }
        }}
        data={data}
        isLoading={false}
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
                <IconButton
                //   onClick={() => toggleForm(row)}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  // onClick={() =>
                  //   confirmDelete(async () => await mutateAsync({ id: value }))
                  // }
                  onClick={() => console.log({ value, row })}
                >
                  <Delete />
                </IconButton>
              </Stack>
            ),
          },
        ]}
      />

      <Form
        isOpen={isOpenForm}
        //   data={dataForm}
        onClose={() => toggleForm(null)}
      />
    </Stack>
  );
}
