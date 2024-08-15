import { Stack } from "@mui/material";

import TextField from "@components/TextField";
import ActionDialog from "@components/ActionDialog";

import { useCategoryUpdate } from "@libs/queries/category/useCategoryUpdate";

import { z } from "zod";

import useValidateForm from "@hooks/useValidateForm";

import { CategoryResponseDTO } from "@libs/queries/category/dtos/CategoryResponseDTO";

const schema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: "Informe o Nome" }),
  order: z.number().min(1, { message: "Informe a Ordem da Categoria" }),
});

interface FormUpdateProps {
  data: CategoryResponseDTO;
  onClose: () => void;
}

export default function FormUpdate({ data, onClose }: FormUpdateProps) {
  const { mutateAsync, isPending } = useCategoryUpdate();

  const { FormProvider, handleSubmit } = useValidateForm({
    schema,
    defaultValues: data,
  });

  return (
    <ActionDialog
      title="Cadastro de Categoria"
      isLoading={isPending}
      onClose={() => onClose()}
      onSubmit={handleSubmit(async (data) => {
        const { id, ...rest } = data;
        await mutateAsync({ id, data: rest });
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
