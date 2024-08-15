import { Stack } from "@mui/material";

import TextField from "@components/TextField";
import ActionDialog from "@components/ActionDialog";

import { useProductUpdate } from "@libs/queries/product/useProductUpdate";

import { z } from "zod";

import useValidateForm from "@hooks/useValidateForm";

import { ProductResponseDTO } from "@libs/queries/product/dtos/ProductResponseDTO";

const schema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: "Informe o Nome" }),
  order: z.number().min(1, { message: "Informe a Ordem do Produto" }),
});

interface FormUpdateProps {
  data: ProductResponseDTO;
  onClose: () => void;
}

export default function FormUpdate({ data, onClose }: FormUpdateProps) {
  const { mutateAsync, isPending } = useProductUpdate();

  const { FormProvider, handleSubmit } = useValidateForm({
    schema,
    defaultValues: data,
  });

  return (
    <ActionDialog
      title="Cadastro de Produto"
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
            label="Ordem do Produto"
            name="order"
          />
        </Stack>
      </FormProvider>
    </ActionDialog>
  );
}
