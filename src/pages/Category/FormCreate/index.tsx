import { Stack } from "@mui/material";

import TextField from "@components/TextField";
import ActionDialog from "@components/ActionDialog";

import { useCategoryCreate } from "@libs/queries/category/useCategoryCreate";

import { z } from "zod";

import useValidateForm from "@hooks/useValidateForm";

const schema = z.object({
  name: z.string().min(1, { message: "Informe o Nome" }),
  order: z.number().min(1, { message: "Informe a Ordem da Categoria" }),
});

interface FormCreateProps {
  onClose: () => void;
}

export default function FormCreate({ onClose }: FormCreateProps) {
  const { mutateAsync, isPending } = useCategoryCreate();

  const { FormProvider, handleSubmit } = useValidateForm({
    schema,
    defaultValues: { name: "", order: 0 },
  });

  return (
    <ActionDialog
      title="Cadastro de Categoria"
      isLoading={isPending}
      onClose={() => onClose()}
      onSubmit={handleSubmit(async (data) => {
        await mutateAsync({ data });
        onClose();
      })}
    >
      <FormProvider>
        <Stack gap={2}>
          <TextField required label="Nome" name="name" />
          <TextField
            required
            type="number"
            label="Ordem da Categoria"
            name="order"
          />
        </Stack>
      </FormProvider>
    </ActionDialog>
  );
}
